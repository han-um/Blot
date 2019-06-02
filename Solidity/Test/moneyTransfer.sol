pragma solidity ^0.5.8;

contract moneyTransferTest {

    // 컨트랙트 배포자
    address payable public owner;

    constructor() public {
        owner = msg.sender;
    }

    // postId에 대한 보상금
    mapping(uint => uint) postReward;

    // 글 등록시 보상금을 스마트 컨트랙트 배포자에게 입금
    function setPostTotalReward(uint _postId, uint _reward) external payable {
      //require(msg.value > 0);
      postReward[_postId] = _reward;
    }

    function getBalanceOfAddress(address _address) external view returns (uint) {
        return _address.balance;
    }

    function sendBalanceOfContractToOwner() external {
      require(msg.sender == owner);
      owner.transfer(address(this).balance);
    }

    function transferToAccount(address payable _address) external {
      _address.transfer(30);
    }
}
