// Interacting directly with KlaytnGreeter contract
const BlotUser = artifacts.require("./BlotUser.sol");
const BlotProject = artifacts.require("./BlotProject.sol");
const BlotMain = artifacts.require("./BlotMain.sol");
const truffleAssert = require('truffle-assertions');

contract("BlotMain", async(accounts) => {
    // store the contract instance at a higher level 
    // to enable access from all functions.
    var blotMainInstance;
    var owner = accounts[0];

    // This will run before each test proceed.
    before(async function() {
        blotProjectInstance = await BlotProject.new({from:owner});
        blotUserInstance = await BlotUser.new({from:owner});

        // set contract instnace into a variable
        blotMainInstance = await BlotMain.new(BlotProject.address, BlotUser.address, {from:owner});
    })

    it("#0 컨트랙트 소유자 확인", async function() {
        var ownerAddress = await blotMainInstance.owner();
        assert(owner, ownerAddress, "컨트랙트 소유자가 일치하지않습니다.");
    });

    it("#1 사용자 계정 만들기", async function() {
        // 사용자 계정 만들고
        await blotMainInstance.userSignUp("kss", accounts[0], { from:owner });

        // 아이디로 계정 주소 불러와보고
        var userAddress = await blotMainInstance.getUserAddressByUserId("kss");

        // 계정 주소가 일치하는지 확인
        var expectedUserAddress = accounts[0];
        assert.equal(expectedUserAddress, userAddress, "사용자가 정상 등록되지 않음");

        var formerBalance = await blotMainInstance.getUserBalanceByUserAddress(accounts[0], { from:owner });    
        assert.equal(formerBalance, 1000000, "컨트랙트 소유자에게 돈이 제대로 들어오지 않았습니다.");
    });

    describe("#2 사용자 계정 변경하기", () => {

        it('#2-0 변경 전 계정 잔액 조회', async function() {
            // 이전 계정의 잔고
            var formerBalance = await blotMainInstance.getUserBalanceByUserAddress(accounts[0], { from:owner });
            //console.log('바꾸기 전 사용자 계정의 잔고 '+formerBalance);
        });

        it("#2-1 계정 변경 및 주소 바뀐 것 확인", async function() {
            await blotMainInstance.replaceOldToNewUserAddress("kss", accounts[1], { from:owner });

            // 0번 계정에서 1번 계정으로 계정 변경
            var userAddress = await blotMainInstance.getUserAddressByUserId("kss");
            var expectedUserAddress = accounts[1];
    
            assert.equal(expectedUserAddress, userAddress, "사용자 계정 주소가 정상 변경되지 않음");
        });

        it('#2-2 이전 계정 잔액 조회', async function() {
            // 이전 계정의 잔고
            var formerBalance = await blotMainInstance.getUserBalanceByUserAddress(accounts[0], { from:owner });
            //console.log("formerBalance "+formerBalance);
        });

        it('#2-3 바뀐 계정 잔액 조회', async function() {
            // 변경 계정의 잔고
            var changedBalance = await blotMainInstance.getUserBalanceByUserAddress(accounts[1], { from:owner });
            //console.log("changedBalance "+changedBalance);
        });    
    });

    describe("#3 사용자 신뢰 점수 변경하기", () => {

        it('#3-1 현재 사용자의 신뢰 점수', async function() {
            // 이전 계정의 잔고
            var currentUserReliability = await blotMainInstance.getUserReliabilityByUserId("kss");
            assert.equal(currentUserReliability, 100, "사용자의 초기 신뢰 점수값이 적절하지 않습니다.");
        });

        it("#3-2 사용자의 신뢰 점수 10점 증가시키기", async function() {

            console.log("owner : " + owner);
            var result = await blotMainInstance.owner();
            console.log("owner : " + result);

            await blotMainInstance.updateUserReliability("kss", 10, {from:owner});
            
            var currentUserReliability = await blotMainInstance.getUserReliabilityByUserId("kss");
            assert.equal(currentUserReliability, 110, "사용자의 신뢰 점수가 증가하지 않았습니다.");
        });

        it("#3-2 사용자의 신뢰 점수 10점 감소시키기", async function() {
            await blotMainInstance.updateUserReliability("kss", -10, {from:owner});
            
            var currentUserReliability = await blotMainInstance.getUserReliabilityByUserId("kss");
            assert.equal(currentUserReliability, 100, "사용자의 신뢰 점수가 증가하지 않았습니다.");
        });    
    });
    

});



//     it("#2 update greeting message.", async function() {
//         var newGreeting = "Hi, Klaytn";
// ​
//         await klaytnGreeterInstance.setGreet(newGreeting, { from:owner });
//         var greet = await klaytnGreeterInstance.greet();
//         assert.equal(newGreeting, greet, "greeting message should match");
//     });
// ​
//     it("#3 [Failure test] Only owner can change greeting.", async function() {
//         var fakeOwner = accounts[1];        
//         await truffleAssert.fails(klaytnGreeterInstance.setGreet(greetMsg, { from:fakeOwner }));
//     });