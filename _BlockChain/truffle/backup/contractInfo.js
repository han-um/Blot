const fs = require('fs');

module.exports = {
    DEPLOYED_BLOTTOKEN_ABI : fs.existsSync('./metadata/BlotToken_ABI') && fs.readFileSync('./metadata/BlotToken_ABI', 'utf8'),
    DEPLOYED_BLOTTOKEN_ADDRESS : fs.readFileSync('./metadata/BlotToken_Address', 'utf8').replace(/\n|\r/g, ""),

    DEPLOYED_BLOTPROJECT_ABI : fs.existsSync('./metadata/BlotProject_ABI') && fs.readFileSync('./metadata/BlotProject_ABI', 'utf8'),
    DEPLOYED_BLOTPROJECT_ADDRESS : fs.readFileSync('./metadata/BlotProject_Address', 'utf8').replace(/\n|\r/g, ""),

    DEPLOYED_BLOTUSER_ABI : fs.existsSync('./metadata/BlotUser_ABI') && fs.readFileSync('./metadata/BlotUser_ABI', 'utf8'),
    DEPLOYED_BLOTUSER_ADDRESS : fs.readFileSync('./metadata/BlotUser_Address', 'utf8').replace(/\n|\r/g, ""),

    DEPLOYED_BLOTMAIN_ABI : fs.existsSync('./metadata/BlotMain_ABI') && fs.readFileSync('./metadata/BlotMain_ABI', 'utf8'),
    DEPLOYED_BLOTMAIN_ADDRESS : fs.readFileSync('./metadata/BlotMain_Address', 'utf8').replace(/\n|\r/g, "")
};