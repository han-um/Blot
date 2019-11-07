const BlotToken = artifacts.require("BlotToken");
const KlaytnMonetaryUnit = artifacts.require("KlaytnMonetaryUnit");
const fs = require('fs');

module.exports = function(deployer) {
    deployer.deploy(KlaytnMonetaryUnit);
    deployer.link(KlaytnMonetaryUnit, BlotToken);
    deployer.deploy(BlotToken)
    .then(()=> {
    if(BlotToken._json) {
        fs.writeFile(
            './metadata/BlotToken_ABI',
            JSON.stringify(BlotToken._json.abi),
            (err) => {
                if(err) throw err
                console.log("BlotToken ABI 기록 성공");
            }
        )
    }

    fs.writeFile(
        './metadata/BlotToken_Address',
        BlotToken.address,
        (err) => {
            if (err) throw err
            console.log("BlotToken Address 기록 성공");
        }
    )
    });
};
