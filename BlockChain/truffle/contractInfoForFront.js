var beautify = require('js-beautify').js,
    fs = require('fs');

var DEPLOYED_BLOTTOKEN_ABI = fs.existsSync('./metadata/BlotToken_ABI') && fs.readFileSync('./metadata/BlotToken_ABI', 'utf8');
var DEPLOYED_BLOTTOKEN_ADDRESS = fs.readFileSync('./metadata/BlotToken_Address', 'utf8').replace(/\n|\r/g, "");
var DEPLOYED_BLOTPROJECT_ABI = fs.existsSync('./metadata/BlotProject_ABI') && fs.readFileSync('./metadata/BlotProject_ABI', 'utf8');
var DEPLOYED_BLOTPROJECT_ADDRESS = fs.readFileSync('./metadata/BlotProject_Address', 'utf8').replace(/\n|\r/g, "");
var DEPLOYED_BLOTUSER_ABI = fs.existsSync('./metadata/BlotUser_ABI') && fs.readFileSync('./metadata/BlotUser_ABI', 'utf8');
var DEPLOYED_BLOTUSER_ADDRESS = fs.readFileSync('./metadata/BlotUser_Address', 'utf8').replace(/\n|\r/g, "");
var DEPLOYED_BLOTMAIN_ABI = fs.existsSync('./metadata/BlotMain_ABI') && fs.readFileSync('./metadata/BlotMain_ABI', 'utf8');
var DEPLOYED_BLOTMAIN_ADDRESS = fs.readFileSync('./metadata/BlotMain_Address', 'utf8').replace(/\n|\r/g, "");

var info = beautify(
    '\/* eslint-disable *\/'+
    'module.exports = {'+
    'DEPLOYED_BLOTTOKEN_ABI:' + DEPLOYED_BLOTTOKEN_ABI + ',' +
    'DEPLOYED_BLOTTOKEN_ADDRESS: \'' + DEPLOYED_BLOTTOKEN_ADDRESS + '\',' +
    'DEPLOYED_BLOTPROJECT_ABI:' + DEPLOYED_BLOTPROJECT_ABI + ',' +
    'DEPLOYED_BLOTPROJECT_ADDRESS:\'' + DEPLOYED_BLOTPROJECT_ADDRESS + '\',' +
    'DEPLOYED_BLOTUSER_ABI:' + DEPLOYED_BLOTUSER_ABI + ',' +
    'DEPLOYED_BLOTUSER_ADDRESS:\'' + DEPLOYED_BLOTUSER_ADDRESS + '\',' +
    'DEPLOYED_BLOTMAIN_ABI:' + DEPLOYED_BLOTMAIN_ABI + ',' +
    'DEPLOYED_BLOTMAIN_ADDRESS:\'' + DEPLOYED_BLOTMAIN_ADDRESS + '\'' +
    '}', 
    { 
        indent_size: 2, 
        end_with_newline : true, 
        brace_style:"expand"
    }
);

console.log(info);

fs.writeFile(
    './contaractInfo.js',
    info,
    (err) => {
        if(err) throw err
        console.log("contaractInfo 기록 성공");
    }
);