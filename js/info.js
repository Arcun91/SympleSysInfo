const si = require('systeminformation');


var bios = function(){
    return si.bios().then(data => {return data});
}

var baseboard = function(){
    return si.baseboard().then(data => {return data})
}

var cpu = function(){
    return si.cpu().then(data => {return data})
}


exports.getBiosInfo = bios;
exports.getBaseboardInfo = baseboard;
exports.getCpuInfo = cpu;