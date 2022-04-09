// SPDX-License-Identifier: MIT
import "hardhat/console.sol";
import "./library/PRBMathUD60x18.sol";

pragma solidity ^0.8.4; 
/* 
Pseudocode: 
- define policy's end times: monthly (yearly renew) / weekly (monthly renew)
- each policy is separated 
- each policy has predefined insurance levels 
- one provider can provide quotes and lots for many levels and expirations, if his balance > $100
- each policy settles to $100
- each policy can cost between $0.01 - $1000
- if balance of provider in the contract is less than $100, provider's quotes are ignored
- delay provider quote deletion? to stop frontrunning
- separate providers and takers
- on take: transfer cost to provider balance; subtract 100 from providers balance
- create activeProviders{Month}, activeTakers{Month} maps to levels and lots
- level is checked only at end of the month (price can go lower before that)
- if month is expired; check oracle; transfer 100 to winner of policy and delete fields in maps
- if month is expire
*/
    // TODO: make possible to provide at multiple prices and levels
    // TODO: Smart contract transaction bundler 
    // TODO: Ability to close policy before settlement (provider, taker)


interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

interface customOracle{
    function getExpiryPriceLevel(uint256 _expiry) external view returns(uint256);
}

contract Insure{
    // Allow DAI transfers from DAI contract

    using PRBMathUD60x18 for uint256;


    address public owner; 
    address public usdAddress; 
    address public oracleAddress; 
    mapping(uint256 => bool) public expiryDates; 
    constructor(uint256[] memory _expiryDates,  address _usdAddress){
        owner = msg.sender; 
        for(uint256 i=0; i<_expiryDates.length; i++){
            expiryDates[_expiryDates[i]] = true; 
        }
        usdAddress = _usdAddress;
    }

    // Modifiers
    modifier onlyOwner(){
        require(msg.sender == owner, "Only owner can do this");
        _;
    }
    function setOracle(address _oracleAddress) public onlyOwner{
        oracleAddress = _oracleAddress; 
    }

    mapping(address => uint256) public balance; 
    function deposit(uint256 _amount) public {
        IERC20(usdAddress).transferFrom(msg.sender, address(this), _amount); 
        balance[msg.sender] += _amount;
    }
    function withdraw(uint256 _amount) public{
        require(balance[msg.sender] >= _amount, "Withdraw amount exceeds balance."); 
        balance[msg.sender] -= _amount;
        IERC20(usdAddress).transfer(msg.sender, _amount); 
    }

    // Events
    event PositionOpened(address indexed taker, address indexed provider, uint256 expiry, uint256 lots, uint256 price);
    event PositionClosed(address indexed taker, address indexed provider, uint256 expiry, uint256 lots, uint256 price, bool policyPaid);

    event NewPolicyAvailability(address indexed provider);


    // Active policies (takers)
    struct ActiveTakerData{
        address provider; 
        uint256 lots; 
        uint256 level; 
        uint256 expiry; 
    }
    mapping(address => ActiveTakerData[]) public activeTakersPolicies;

    function getActiveTakersPolicies(address _addr) public view returns(ActiveTakerData []memory){
        return activeTakersPolicies[_addr]; 
    }


    // Provider Data
    mapping(address => address[]) public activeProviderTakers; 
    function getActiveProviderTakers(address _addr) public view returns(address []memory){
        return activeProviderTakers[_addr]; 
    }

    struct ProviderData{ 
        uint256 lots; 
        uint256 level;
        uint256 price; 
    }
    mapping(address => mapping(uint256 => ProviderData)) public providers; 

    // Set provider info
    function setProviderInfo(uint256 _expiry, uint256 _lots, uint256 _level, uint256 _price) public {
        require(balance[msg.sender] > 100* 10**18, "Balance too low"); // change to ethers units 
        require(expiryDates[_expiry] == true, "No such expiry available"); 
        require(_expiry > block.timestamp, "Expiry in the past.");
        require(_lots < 1000 && _price > 1e16 && _price < 1e21, "Price and Lot Data not compatible"); 

        providers[msg.sender][_expiry] = ProviderData({lots: _lots * 10**18, level: _level, price: _price});
    }

    function deleteProviderPolicies(uint256[] calldata _expiry) public{
        for(uint80 i = 0; i< _expiry.length; i++){

        delete providers[msg.sender][_expiry[i]];
        }
        return; 
    }

    function openPolicy(address _providerAddr, uint256 _expiry, uint256 _lots, uint256 _level, uint256 _price) public {
        _lots = _lots * 1e18;
        require(_providerAddr != msg.sender, "Provider and taker must be different");
        require(providers[_providerAddr][_expiry].lots != 0, "Provider has no such offer.");
        require(providers[_providerAddr][_expiry].lots >= _lots, "Not enough lots");
        require(providers[_providerAddr][_expiry].level == _level, "Wrong insurance level");
        require(providers[_providerAddr][_expiry].price == _price, "Wrong cost of insurance");

        require(balance[_providerAddr] > _lots.mul(100 * 1e18),  "Provider has not enough funds.");
        require(balance[msg.sender] > _price.mul(_lots), "Taker has not enough funds.");

        require(expiryDates[_expiry] == true, "Expiry date is not valid."); 

        balance[_providerAddr] -= _lots.mul(100 * 1e18); 

        balance[msg.sender] -= providers[_providerAddr][_expiry].price.mul(_lots);
        balance[_providerAddr] += providers[_providerAddr][_expiry].price.mul(_lots); 
        
        activeTakersPolicies[msg.sender].push(ActiveTakerData({provider: _providerAddr, lots: _lots, level: _level, expiry: _expiry}));
        activeProviderTakers[_providerAddr].push(msg.sender); 
        return; 
    }

    function checkPolicies(address _address) public{
        require(activeTakersPolicies[_address].length != 0, "No such taker address");
        for(uint256 i =0; i<activeTakersPolicies[_address].length; i++ ){
            if(activeTakersPolicies[_address][i].expiry < block.timestamp && activeTakersPolicies[_address][i].expiry > 0){
                closePolicy(_address, i, activeTakersPolicies[_address][i].expiry);
            }
        }
        return; 
    }

    function closePolicy(address _address, uint256 _index, uint256 _expiry) private {
        uint256 closingLevel = customOracle(oracleAddress).getExpiryPriceLevel(_expiry);

        if(activeTakersPolicies[_address][_index].level < closingLevel){
            balance[_address] += activeTakersPolicies[_address][_index].lots.mul(100 * 1e18); 
            delete activeTakersPolicies[_address][_index]; 
        } else {
            address prov = activeTakersPolicies[_address][_index].provider;
            balance[prov] += activeTakersPolicies[_address][_index].lots.mul(100 * 1e18);
            delete activeTakersPolicies[_address][_index]; 
        }
        return;
    }
}