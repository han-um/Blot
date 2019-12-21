const BlotUser = artifacts.require("BlotUser");
const fs = require('fs');

module.exports = function(deployer) {
  deployer.deploy(BlotUser)
  .then(()=> {
    if(BlotUser._json) {
        fs.writeFile(
            './metadata/BlotUser_ABI',
            JSON.stringify(BlotUser._json.abi),
            (err) => {
                if(err) throw err
                console.log("BlotUser ABI 기록 성공");
            }
        )
    }

    fs.writeFile(
        './metadata/BlotUser_Address',
        BlotUser.address,
        (err) => {
            if (err) throw err
            console.log("BlotUser Address 기록 성공");
        }
    )
  });
};
