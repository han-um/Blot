pragma solidity ^0.5.8;

import "./blotPost.sol";

/***
 * @title BlotMain Contract
 *  사용자별 번역 활동(번역, 평가) 내역을 이벤트로 저장
 *  번역 활동 기여도에 따른 보상금 지급
*/

contract BlotMain is BlotPost {

  // 번역, 평가 기록에 대한 event
  event NewTranslation(uint postId, string translatorId, uint userShare, uint[] sentenceId);
  event NewEvaluation(uint postId, string evaluatorId, uint userShare, uint[] sentenceId);

  /// @param _postId 글 id
  /// @param _transActivity 번역자별 번역 문장 리스트
  /// @dev 문장 번역 기록을 저장할 이벤트 호출
  function generateTranslationEvent(uint _postId, string calldata _translatorId, uint _userShare, uint[] calldata _sentenceId) external onlyOwner {
      emit NewTranslation(_postId, _translatorId, _userShare, _sentenceId);
  }

  /// @param _postId 글 id
  /// @param _evalActivity 평가자별 평가 문장 리스트
  /// @dev 문장 평가 기록을 저장할 이벤트 호출
  function generateEvaluationEvent(uint _postId, string calldata _evaluatorId, uint _userShare, uint[] calldata _sentenceId) external onlyOwner {
      emit NewTranslation(_postId, _evaluatorId, _userShare, _sentenceId);
  }

  // @dev 다수 사용자에게 보상금 지급 by userAccount
  // @param _userAccountList 보상받을 사용자 계정 리스트
  // @param _moneyList 사용자가 보상받을 금액 리스트
  function sendRewardToUsersByAccount (address payable[] calldata _userAccountList, uint[] calldata _moneyList) external onlyOwner {
    for(uint i=0; i<_userAccountList.length; i++)
      _transferToAccount(_userAccountList[i], _moneyList[i]);
  }

  // @dev 한 사용자에게 보상금 지급 by userId
  // @param _userId 보상받을 사용자 id
  // @param _money 사용자가 보상받을 금액
  function sendRewardToUserByUserId (string calldata _userId, uint _money) external onlyOwner {
    address payable userAccount = userInfo[_userId].account;
    _transferToAccount(userAccount, _money);
  }

  /**
   * @dev 컨트랙트 계정 지갑에서 사용자에게 보상금 지급
   */
  function _transferToAccount(address payable _account, uint _money) private {
    require(address(this).balance >= _money);
    _account.transfer(_money);
  }

  /// @notice 삭제해도 됨!
  /// @dev 계정 지갑의 잔고 반환
  function getBalanceOfAccount (address payable _account) external view returns (uint) {
      return _account.balance;
  }
}
