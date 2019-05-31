pragma solidity ^0.5.8;

contract EventTest {
    // 번역, 평가 기록에 대한 event
    event NewTranslation(uint postId, address translatorAddress, uint userShare, uint[] sentenceId);

    /// @dev 문장 번역 기록을 저장할 이벤트 호출
    function _generateTranslationEvent(uint _postId, address _translatorAddress, uint _userShare, uint[] memory _sentenceId) internal {
        emit NewTranslation(_postId, _translatorAddress, _userShare, _sentenceId);
    }

    /// @param _postId 글 id
    /// @param _transActivity 번역자별 번역 문장 리스트
    /// @param _evalActivity 평가자별 평가 문장 리스트
    /// @dev 번역 활동 기록을 저장
    function generateActivityEvent(uint _postId, address _userAddresses, uint _userShare, uint[] memory _userSentenceId) public {
        // 번역 활동 event 호출
        _generateTranslationEvent(_postId, _userAddresses, _userShare, _userSentenceId);
    }

}
