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
    function getExpiryPriceLevel(uint _expiry) external view returns(uint);
}

contract Insure{
    // Allow DAI transfers from DAI contract


    address public owner; 
    address public usdAddress; 
    address public oracle; 
    mapping(uint => bool) public expiryDates; 
    constructor(uint[] memory _expiryDates,  address _usdAddress){
        owner = msg.sender; 
        for(uint i=0; i<_expiryDates.length; i++){
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

    // Events
    event PositionOpened(address indexed taker, address indexed provider, uint expiry, uint lots, uint price);
    event PositionClosed(address indexed taker, address indexed provider, uint expiry, uint lots, uint price, bool policyPaid);

    event NewPolicyAvailability(address indexed provider);


    mapping(address => uint) public balance; 
    // Active policies (takers)
    struct ActiveTakerData{
        address provider; 
        uint lots; 
        uint level; 
        uint expiry; 
    }
    mapping(address => ActiveTakerData[]) public activeTakersPolicies;

    // Provider Data
    mapping(address => address[]) public activeProviderTakers; 
    struct ProviderData{ 
        uint lots; 
        uint level;
        uint price; 
    }
    mapping(address => mapping(uint => ProviderData)) public providers; 

    // Set provider info
    function setProviderInfo(uint _expiry, uint _lots, uint _level, uint _price) public {
        // require(providerBalance[msg.sender] > 100); // change to ethers units
        providers[msg.sender][_expiry] = ProviderData({lots: _lots, level: _level, price: _price});
    }
    function deleteAllProviderPolicies(uint _expiry) public{
        delete providers[msg.sender][_expiry];
    }

    function deposit(uint _amount) public {
        IERC20(usdAddress).transferFrom(msg.sender, address(this), _amount); 
        balance[msg.sender] += _amount;
    }
    function withdraw(uint _amount) public{
        require(balance[msg.sender] >= _amount, "Withdraw amount exceeds balance."); 
        balance[msg.sender] -= _amount;
        IERC20(usdAddress).transfer(msg.sender, _amount); 
    }

    function openPolicy(address _providerAddr, uint _expiry, uint _lots, uint _level) public {
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
        for(uint i =0; i<activeTakersPolicies[_address].length; i++ ){
            if(activeTakersPolicies[_address][i].expiry < block.timestamp){
                closePolicy(_address, i);
            }
        }
    }

    function closePolicy(address _address, uint _index) private {
        // require oracle
        uint closingLevel = 108;
        if(activeTakersPolicies[_address][_index].level < closingLevel){
            balance[_address] += activeTakersPolicies[_address][_index].lots * 100; 
        } else {
            address prov = activeTakersPolicies[_address][_index].provider;
            balance[prov] += activeTakersPolicies[_address][_index].lots * 100; 
        }
        return;
    }
}