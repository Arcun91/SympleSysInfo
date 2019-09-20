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
var cpuSpeed = function(){
    return si.cpuCurrentspeed().then(data => {return data})
}
var cpuTemperature = function(){
    return si.cpuTemperature().then(data => {return data})
}
var mem = function(){
    return si.mem().then(data => {return data});
}
var memLayout = function(){
    return si.memLayout().then(data => {return data});
}
exports.home = [mem()];
exports.mainboard = [bios(), baseboard()];
exports.cpu = [cpu(), cpuSpeed(), cpuTemperature()];
exports.memory = [mem(), memLayout()];
exports.bios = [bios()];