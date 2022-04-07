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
    address public oracle; 
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
    function setOracle(address _oracle) public onlyOwner{
        oracle = _oracle; 
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

    // Provider Data
    mapping(address => address[]) public activeProviderTakers; 
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
        require(_expiry < block.timestamp);
        require(_lots < 1000 && _price > 1e16 && _price < 1e21, "Price and Lot Data not compatible"); 

        providers[msg.sender][_expiry] = ProviderData({lots: _lots * 10**18, level: _level, price: _price});
    }
    function deleteAllProviderPolicies(uint256 _expiry) public{
        delete providers[msg.sender][_expiry];
    }

    function openPolicy(address _providerAddr, uint256 _expiry, uint256 _lots, uint256 _level) public {
        require(_providerAddr != msg.sender, "Provider and taker must be different");
        require(providers[_providerAddr][_expiry].lots != 0, "Provider has no such offer.");
        require(providers[_providerAddr][_expiry].lots >= _lots, "Not enough lots");
        require(providers[_providerAddr][_expiry].level == _level, "Wrong insurance level");

        require(balance[_providerAddr] > _lots * 100, "Provider has not enough funds.");
        require(balance[msg.sender] > providers[_providerAddr][_expiry].price * _lots, "Takes has not enough funds.");

        require(expiryDates[_expiry] == true, "Expiry date is not valid."); 

        balance[_providerAddr] -= _lots*_level; 
        balance[msg.sender] -= _lots*providers[_providerAddr][_expiry].price;
        balance[_providerAddr] += providers[_providerAddr][_expiry].price * _lots; 
        
        activeProviderTakers[_providerAddr].push(_providerAddr);
        activeTakersPolicies[msg.sender].push(ActiveTakerData({provider: _providerAddr, lots: _lots, level: _level, expiry: _expiry}));
    }

    function checkPolicies(address _address) public{
        for(uint256 i =0; i<activeTakersPolicies[_address].length; i++ ){
            if(activeTakersPolicies[_address][i].expiry < block.timestamp){
                closePolicy(_address, i);
            }
        }
    }

    function closePolicy(address _address, uint256 _index) private {
        // require oracle
        uint256 closingLevel = 108;
        if(activeTakersPolicies[_address][_index].level < closingLevel){
            balance[_address] += activeTakersPolicies[_address][_index].lots * 100; 
        } else {
            address prov = activeTakersPolicies[_address][_index].provider;
            balance[prov] += activeTakersPolicies[_address][_index].lots * 100; 
        }
        return;
    }
}