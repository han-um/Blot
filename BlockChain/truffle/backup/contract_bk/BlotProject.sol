pragma solidity ^0.5.6;

contract BlotProject {

    address private owner;

    constructor () public {
        owner = msg.sender;
    }

    struct Project {
        string writerId;
        string deadline;
        uint256 reward;
        bool used;
    }

    mapping(string => Project) projectInfo;

    // 프로젝트 정보 저장
    function createProject(
        string memory projectId,
        string memory writerId,
        string memory deadline,
        uint256 reward
    )
        public
        returns (bool)
    {
        require(msg.sender == owner);
        // 해당 프로젝트 아이디가 사용중이 아니어야 함
        require(!projectExist(projectId), "ERROR : That projectId already exists. Can't create project info.");
        projectInfo[projectId] = Project(writerId, deadline, reward, true);
        emit NewProject(reward, deadline, projectId);
        return true;
    }

    // 프로젝트 보상금 조회
    function getProjectRewardByprojectId(string memory projectId) public view returns (uint256) {
        require(projectExist(projectId), "ERROR : There is not the project. Can't get project reward.");
        return projectInfo[projectId].reward;
    }

    // 프로젝트 정보 조회
    function getProjectInfoByprojectId(string memory projectId) public view returns (string memory, string memory, uint256) {
        require(projectExist(projectId), "ERROR : There is not the project. Can't get project info.");
        return (
            projectInfo[projectId].writerId,
            projectInfo[projectId].deadline,
            projectInfo[projectId].reward
        );
    }

    // 프로젝트가 등록되었는지 확인하는 함수
    function projectExist(string memory projectId) public view returns (bool) {
        if(projectInfo[projectId].used)
            return true;
        return false;
    }

    // 새로운 프로젝트가 등록되었음을 이벤트로 기록
    event NewProject(
        uint256 indexed reward,
        string deadline,
        string projectId
    );
}