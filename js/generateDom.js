
const os = require('os');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const si = require('systeminformation');

exports.generate = (
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

var header = function(title, icon){
    var string = '<div class="box"><div class="box-header"><i class="fa fa-'+icon+'"></i><h3 class="box-title">'+title+'</h3></div><div class="box-body chat" id="chat-box">';
    return string;
}


var generalInfo = function(platform, minutes, seconds, memory){
    var string = header("Info Generali:", "info");
    platform != null ? string+="<p>Sistema Operativo: "+platform+"</p>" : string+="<p>Sistema Operativo: N/D</p>";
    string+="<p>Architettura: "+os.arch()+"<p>";
    string+="<p>CPU: "+os.cpus()[0].model+"<p>";
    string+="<p>Memoria Totale: "+Math.round(memory.total/1000000)+" MB</p>";
    string+="<p>Memoria Disponibile: "+Math.round(memory.available/1000000)+" MB</p>";
    string+="<p>Memoria Utilizzata: "+Math.round(memory.active/1000000)+" MB</p>";
    string+="<p>Memoria Cache: "+Math.round(memory.buffcache/1000000)+" MB</p>";
    string+="<p>Memoria Libera: "+Math.round(memory.free/1000000)+" MB</p>";
    string+="<p>Acceso da: "+minutes +" minuti e "+ seconds+" secondi</p>";
    string+='</div></div></div>';
    return string;
};

var mainboardInfo = function(bios, baseboard){
    var string = header("Scheda Madre: ", "microchip");
    typeof baseboard.manufacturer != "undefined" ? string+="<p>Produttore: "+baseboard.manufacturer+"</p>" : "";
    typeof baseboard.model != "undefined" ? string+="<p>Modello: "+baseboard.model +"</p>" : "";
    typeof baseboard.serial != "undefined" ? string+="<p>Seriale: "+baseboard.serial+"</p>": "";
    typeof bios.version != "undefined" ? string+="<p>Versione BIOS: "+bios.version+" rilasciato il:"+bios.releaseDate+"</p>": "";
    string+='</div></div></div>';
    return string;
}

var cpuInfo = function(cpu, cpuSpeed, cpuTemperature){
    var string = header("CPU: ", "microchip");
    string+="<p>Produttore: "+cpu.manufacturer+"</p>";
    string+="<p>Brand: "+cpu.brand+"</p>";
    string+="<p>Core: "+os.cpus().length+"</p>";
    string+="<p>Velocità attuale: "+cpuSpeed.min+" GHZ</p>";
    string+= cpuTemperature.main != "-1" ? "<p>Temperatura: "+cpuTemperature.main+" °</p>" : "";
    string+="<p>Cache L1D: "+cpu.cache.l1d/1000+" KB</p>";
    string+="<p>Cache L1L: "+cpu.cache.l1i/1000+" KB</p>";
    string+="<p>Cache L2: "+cpu.cache.l2/1000+" KB</p>";
    string+="<p>Cache L3: "+cpu.cache.l3/1000000+" MB</p>";
    string+='</div></div></div>';
    return string;
}

var memoryInfo = function(memLayout){
    var string = header("Memoria: ", "save");
    for(var index in memLayout){
        var memory = memLayout[index];
        string += "<h3>Banco "+index+"</h3>";
        string += "<p>Dimensione: "+Math.round(memory.size/1000000000)+" GB</p>";
        string += "<p>Tipo: "+memory.type+"</p>";
        string += "<p>Velocità: "+memory.clockSpeed+"</p>";
        string += "<p>Produttore: "+memory.manufacturer+"</p>";
    }
    string+='</div></div></div>';
    return string;
}