pragma solidity ^0.5.0;

import "./SafeMath.sol";

library KlaytnMonetaryUnit {
 
    using SafeMath for uint256;
    
    function pebToKlay(uint256 pebNum) public pure returns (uint256) {
        return pebNum.div(1e18);
    }
    
    function klayToPeb(uint256 klayNum) public pure returns (uint256) {
        return klayNum.mul(1e18);
    }
    
    function klayToBlot(uint256 klayNum) public pure returns (uint256) {
        return klayNum.mul(1e4);
    }
    
    function blotToKlay(uint256 blotNum) public pure returns (uint256) {
        return blotNum.div(1e4);
    }
    
    function blotToPeb(uint256 blotNum) public pure returns (uint256) {
        return blotNum.mul(1e14);
    }
}