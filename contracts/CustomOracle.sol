// SPDX-License-Identifier: MIT
import "hardhat/console.sol";
import "./library/PRBMathUD60x18.sol";

pragma solidity ^0.8.4; 

contract CustomOracle{
    address public owner; 
    mapping(uint => uint) public expiryDatePrice; 
    mapping(uint => bool) public expiryAvailable; 
    constructor(uint[] memory _expiryDates){
        owner = msg.sender; 
        for(uint i=0; i<_expiryDates.length; i++){
            expiryAvailable[_expiryDates[i]] = true; 
        }
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Only owner can do this");
        _;
    }

    function setExpiryPrice(uint _expiry, uint _price) public onlyOwner {
        require(expiryAvailable[_expiry] == true, "No contract with this expiry."); 
        require(block.timestamp > _expiry, "Expiry !< currentTime.");
        require(expiryDatePrice[_expiry] == 0, "Data already set.");
        expiryDatePrice[_expiry] = _price; 
        return; 
    }

    function getExpiryPriceLevel(uint _expiry) public view returns(uint){
        require(expiryAvailable[_expiry] == true, "No contract with this expiry."); 
        require(expiryDatePrice[_expiry] != 0, "Data is still unavailable"); 
        return expiryDatePrice[_expiry]; 
    }

    function makeCorrection(uint _expiry, uint _price) public onlyOwner{
        require(expiryAvailable[_expiry] == true, "No contract with this expiry."); 
        require(expiryDatePrice[_expiry] != 0, "Data is not set.");
        expiryDatePrice[_expiry] = _price; 
        return; 
    }

}