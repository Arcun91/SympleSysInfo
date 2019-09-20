
const os = require('os');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const si = require('systeminformation');
const handlebars = require('handlebars');
var fs = require('fs');
var path = require('path'); 

exports.home = (
    platform, 
    minutes, 
    seconds, 
    memory
) => new JSDOM(
    generalInfo(platform, minutes, seconds, memory)
);

exports.mainboard = (values) => new JSDOM(mainboardInfo(values[0], values[1]));
exports.cpu = (values) => new JSDOM(cpuInfo(values[0], values[1], values[2]));
exports.memory = (values) => new JSDOM(memoryInfo(values[1]));
exports.bios = (values) => new JSDOM(biosInfo(values[0]));

var header = function(title, icon){
    var string = '<div class="box"><div class="box-header"><i class="fa fa-'+icon+'"></i><h3 class="box-title">'+title+'</h3></div><div class="box-body chat" id="chat-box">';
    return string;
}

var generalInfo = function(platform, minutes, seconds, memory){
    handlebars.registerHelper('divideMemory', function(memory) {
        return Math.round(memory/1000000);
    });
    var html = fs.readFileSync(path.resolve("./dist/templates/generalInfo.html"));
    var context = {title: "Informazioni Generali:", icon: "info", platform:platform, os:os, memory:memory, minutes:minutes, seconds:seconds};
    var template = handlebars.compile(html.toString());
    return template(context);
};

var mainboardInfo = function(bios, baseboard){
    var html = fs.readFileSync(path.resolve("./dist/templates/mainboard.html"));
    handlebars.registerHelper('exist', function(object) {
        return typeof object != "undefined" && object != "" ? object : "N/D";
    });
    var context = {title: "Scheda Madre", icon: "microchip", bios:bios, baseboard:baseboard};
    var template = handlebars.compile(html.toString());
    return template(context);
}

var biosInfo = function(bios){
    var html = fs.readFileSync(path.resolve("./dist/templates/bios.html"));
    handlebars.registerHelper('exist', function(object) {
        return typeof object != "undefined" && object != "" ? object : "N/D";
    });
    var context = {title: "Bios", icon: "tags", bios:bios};
    var template = handlebars.compile(html.toString());
    return template(context);
}

var cpuInfo = function(cpu, cpuSpeed, cpuTemperature){
    var html = fs.readFileSync(path.resolve("./dist/templates/cpu.html"));
    handlebars.registerHelper('exist', function(object) {
        return typeof object != "undefined" && object != "" ? object : "N/D";
    });
    handlebars.registerHelper('kb', function(object) {
        return (object/1000).toFixed(0);
    });
    handlebars.registerHelper('mb', function(object) {
        return (object/1000000).toFixed(0);
    });
    var context = {title: "CPU", icon: "microchip", cpuCount:os.cpus().length, cpu:cpu, cpuSpeed:cpuSpeed, cpuTemperature:cpuTemperature};
    var template = handlebars.compile(html.toString());
    return template(context);
}

var memoryInfo = function(memLayout){
    var html = fs.readFileSync(path.resolve("./dist/templates/memory.html"));
    handlebars.registerHelper('gb', function(object) {
        return (object/1000000000).toFixed(0);
    });
    var context = {title: "Memoria", icon: "save", memLayout:memLayout};
    var template = handlebars.compile(html.toString());
    return template(context);
}