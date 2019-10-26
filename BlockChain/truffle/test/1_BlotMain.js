// Interacting directly with KlaytnGreeter contract
const BlotUser = artifacts.require("./BlotUser.sol");
const BlotProject = artifacts.require("./BlotProject.sol");
const BlotToken = artifacts.require("./BlotToken.sol");
const BlotMain = artifacts.require("./BlotMain.sol");
const truffleAssert = require('truffle-assertions');

contract("BlotMain", async(accounts) => {
    // store the contract instance at a higher level 
    // to enable access from all functions.
    var blotMainInstance;
    var owner = accounts[0];

    // This will run before each test proceed.
    before(async function() {
        blotTokenInstance = await BlotToken.new({from:owner});
        blotProjectInstance = await BlotProject.new({from:owner});
        blotUserInstance = await BlotUser.new({from:owner});

        // set contract instnace into a variable
        blotMainInstance = await BlotMain.new(BlotToken.address, BlotProject.address, BlotUser.address, {from:owner});
    })

    it("#1 사용자 계정 만들기", async function() {
        await blotMainInstance.userSignUp("kss", accounts[0], { from:owner });
        var userAddress = await blotMainInstance.getUserAddressByUserId("kss");

        // set the expected greeting messge
        var expectedUserAddress = accounts[0];
        assert.equal(expectedUserAddress, userAddress, "사용자가 정상 등록되지 않음");
    });

    describe("#2 사용자 계정 변경하기", () => {

        it('#2-0 변경 전 계정 잔액 조회', async function() {
            // 이전 계정의 잔고
            var formerBalance = await blotMainInstance.getUserBalanceByUserAddress(accounts[0], { from:owner });
                    
            console.log('formerBalance '+formerBalance);
        });

        it("#2-1 계정 변경 및 주소 바뀐 것 확인", async function() {

            var result = await blotMainInstance.replaceOldToNewUserAddress("kss", accounts[1], { from:owner });
            
            console.log(result);

            var userAddress = await blotMainInstance.getUserAddressByUserId("kss");
    
            var expectedUserAddress = accounts[1];
    
            assert.equal(expectedUserAddress, userAddress, "사용자 계정 주소가 정상 변경되지 않음");
        });

        it('#2-2 이전 계정 잔액 조회', async function() {
            // 이전 계정의 잔고
            var formerBalance = await blotMainInstance.getUserBalanceByUserAddress(accounts[0], { from:owner });
            console.log('formerBalance '+formerBalance);
        });

        it('#2-3 바뀐 계정 잔액 조회', async function() {
            // 변경 계정의 잔고
            var changedBalance = await blotMainInstance.getUserBalanceByUserAddress(accounts[1], { from:owner });
            console.log('changedBalance '+changedBalance);
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