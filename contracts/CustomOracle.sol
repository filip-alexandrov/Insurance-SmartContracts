// SPDX-License-Identifier: MIT
import "hardhat/console.sol";
import "./library/PRBMathUD60x18.sol";

pragma solidity ^0.8.4; 

contract CustomOracle{
    address public owner; 
    mapping(uint256 => uint256) public expiryDatePrice; 
    mapping(uint256 => bool) public expiryAvailable; 
    constructor(uint256[] memory _expiryDates){
        owner = msg.sender; 
        for(uint256 i=0; i<_expiryDates.length; i++){
            expiryAvailable[_expiryDates[i]] = true; 
        }
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Only owner can do this");
        _;
    }

    function setExpiryPrice(uint256 _expiry, uint256 _price) public onlyOwner {
        require(expiryAvailable[_expiry] == true, "No contract with this expiry."); 
        require(block.timestamp > _expiry, "Expiry !< currentTime.");
        require(expiryDatePrice[_expiry] == 0, "Data already set.");
        expiryDatePrice[_expiry] = _price; 
        return; 
    }

    function getExpiryPriceLevel(uint256 _expiry) public view returns(uint256){
        require(expiryAvailable[_expiry] == true, "No contract with this expiry."); 
        require(expiryDatePrice[_expiry] != 0, "Data is still unavailable"); 
        return expiryDatePrice[_expiry]; 
    }

    function makeCorrection(uint256 _expiry, uint256 _price) public onlyOwner{
        require(expiryAvailable[_expiry] == true, "No contract with this expiry."); 
        require(expiryDatePrice[_expiry] != 0, "Data is not set.");
        expiryDatePrice[_expiry] = _price; 
        return; 
    }

}