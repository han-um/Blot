pragma solidity ^0.5.6;

import "./SafeMath.sol";

library KlaytnMonetaryUnit {

    using SafeMath for uint256;

    function pebToKlay(uint256 pebNum) public pure returns (uint256) {
        return pebNum.div(1e18);
    }

    function klayToPeb(uint256 klayNum) public pure returns (uint256) {
        return klayNum.mul(1e18);
    }

    function klayToBlot(uint256 klayNum, uint256 decimal) public pure returns (uint256) {
        return klayNum.mul(10 ** decimal);
    }

    function blotToKlay(uint256 blotNum, uint256 decimal) public pure returns (uint256) {
        return blotNum.div(10 ** decimal);
    }

    function blotToPeb(uint256 blotNum, uint256 decimal) public pure returns (uint256) {
        return blotNum.mul(10 ** 18).div(10 ** decimal);
    }
}