// Interacting directly with KlaytnGreeter contract
const BlotUser = artifacts.require("./BlotUser.sol");
const truffleAssert = require('truffle-assertions');

contract("BlotUser", async(accounts) => {
    // store the contract instance at a higher level 
    // to enable access from all functions.
    var blotUserInstance;
    var owner = accounts[0];

    // This will run before each test proceed.
    before(async function() {
        // set contract instnace into a variable
        blotUserInstance = await BlotUser.new({from:owner});
    })

    it("#1 check createUser message", async function() {

        await blotUserInstance.createUser("kss", '0xB8BFE3C44830dBC02bC60F55E22C1D5AA6DB86e8', { from:owner });
        var userAddress = await blotUserInstance.getUserAddress("kss");

        // set the expected greeting messge
        var expectedUserAddress = '0xB8BFE3C44830dBC02bC60F55E22C1D5AA6DB86e8';

        assert.equal(expectedUserAddress, userAddress, "사용자가 정상 등록 되었음");

    })

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
});