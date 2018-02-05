
const os = require('os');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const si = require('systeminformation');
var _ = require("underscore");

exports.generate = (
    platform, 
    minutes, 
    seconds, 
    bios, 
    baseboard, 
    cpu, 
    cpuSpeed, 
    cpuTemperature, 
    memory, 
    memLayout
) => new JSDOM(
    generalInfo(platform, minutes, seconds, memory)+
    mainboardInfo(bios, baseboard)+
    cpuInfo(cpu, cpuSpeed, cpuTemperature)+
    memoryInfo(memLayout)
);

var generalInfo = function(platform, minutes, seconds, memory){
    var string = "<h1>Info generali:</h1>"
    platform != null ? string+="<p>Sistema Operativo: "+platform+"</p>" : string+="<p>Sistema Operativo: N/D</p>";
    string+="<p>Architettura: "+os.arch()+"<p>";
    string+="<p>CPU: "+os.cpus()[0].model+"<p>";
    string+="<p>Memoria Totale: "+Math.round(memory.total/1000000)+" MB</p>";
    string+="<p>Memoria Disponibile: "+Math.round(memory.available/1000000)+" MB</p>";
    string+="<p>Memoria Utilizzata: "+Math.round(memory.active/1000000)+" MB</p>";
    string+="<p>Memoria Cache: "+Math.round(memory.buffcache/1000000)+" MB</p>";
    string+="<p>Memoria Libera: "+Math.round(memory.free/1000000)+" MB</p>";
    string+="<p>Acceso da: "+minutes +" minuti e "+ seconds+" secondi</p>";
    return string;
};

var mainboardInfo = function(bios, baseboard){
    var string = "<h1>Scheda madre</h1>";
    typeof baseboard.manufacturer != "undefined" ? string+="<p>Produttore: "+baseboard.manufacturer+"</p>" : "";
    typeof baseboard.model != "undefined" ? string+="<p>Modello: "+baseboard.model +"</p>" : "";
    typeof baseboard.serial != "undefined" ? string+="<p>Seriale: "+baseboard.serial+"</p>": "";
    typeof bios.version != "undefined" ? string+="<p>Versione BIOS: "+bios.version+" rilasciato il:"+bios.releaseDate+"</p>": "";
    return string;
}

var cpuInfo = function(cpu, cpuSpeed, cpuTemperature){
    var string = "<h1>CPU: </h1>";
    string+="<p>Produttore: "+cpu.manufacturer+"</p>";
    string+="<p>Brand: "+cpu.brand+"</p>";
    string+="<p>Core: "+os.cpus().length+"</p>";
    string+="<p>Velocità attuale: "+cpuSpeed.min+" GHZ</p>";
    string+= cpuTemperature.main != "-1" ? "<p>Temperatura: "+cpuTemperature.main+" °</p>" : "";
    string+="<p>Cache L1D: "+cpu.cache.l1d/1000+" KB</p>";
    string+="<p>Cache L1L: "+cpu.cache.l1i/1000+" KB</p>";
    string+="<p>Cache L2: "+cpu.cache.l2/1000+" KB</p>";
    string+="<p>Cache L3: "+cpu.cache.l3/1000000+" MB</p>";
    return string;
}

var memoryInfo = function(memLayout){
    var string = "<h1>Memoria: </h1>";
    for(var index in memLayout){
        var memory = memLayout[index];
        string += "<h3>Banco "+index+"</h3>";
        string += "<p>Dimensione: "+Math.round(memory.size/1000000000)+" GB</p>";
        string += "<p>Tipo: "+memory.type+"</p>";
        string += "<p>Velocità: "+memory.clockSpeed+"</p>";
        string += "<p>Produttore: "+memory.manufacturer+"</p>";
    }
    return string;
}