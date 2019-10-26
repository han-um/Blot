const BlotProject = artifacts.require("BlotProject");
const fs = require('fs');

module.exports = function(deployer) {
  deployer.deploy(BlotProject)
  .then(()=> {
    if(BlotProject._json) {
        fs.writeFile(
            './metadata/BlotProject_ABI',
            JSON.stringify(BlotProject._json.abi),
            (err) => {
                if(err) throw err
                console.log("BlotProject ABI 기록 성공");
            }
        )
    }

    fs.writeFile(
        './metadata/BlotProject_Address',
        BlotProject.address,
        (err) => {
            if (err) throw err
            console.log("BlotProject Address 기록 성공");
        }
    )
  });
};
