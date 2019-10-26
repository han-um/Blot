const BlotProject = artifacts.require("BlotProject");
const BlotUser = artifacts.require("BlotUser");
const BlotToken = artifacts.require("BlotToken");
const BlotMain = artifacts.require("BlotMain");
const KlaytnMonetaryUnit = artifacts.require("KlaytnMonetaryUnit");
const fs = require('fs');

module.exports = function(deployer) {
    deployer.deploy(KlaytnMonetaryUnit);
    deployer.link(KlaytnMonetaryUnit, BlotMain);
    deployer.deploy(BlotMain)
    .then(()=> {
    if(BlotMain._json) {
        fs.writeFile(
            './metadata/BlotMain_ABI',
            JSON.stringify(BlotMain._json.abi),
            (err) => {
                if(err) throw err
                console.log("BlotMain ABI 기록 성공");
            }
        )
    }

    fs.writeFile(
        './metadata/BlotMain_Address',
        BlotMain.address,
        (err) => {
            if (err) throw err
            console.log("BlotMain Address 기록 성공");
        }
    )
    });
};
