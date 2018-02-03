
const os = require('os');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const si = require('systeminformation');
 
exports.generate = (platform, minutes, seconds, bios, baseboard, cpu) => new JSDOM(
    "<h1>Info generali</h1>"+
    "<p>Sistema Operativo: "+platform+"<p>"+
    "<p>Architettura: "+os.arch()+"<p>"+
    "<p>CPU: "+os.cpus()[0].model+"<p>"+
    "<p>Memoria Totale: "+Math.round(os.totalmem()/1000000)+" MB</p>"+
    "<p>Memoria Libera: "+Math.round(os.freemem()/1000000)+" MB</p>"+
    "<p>Acceso da: "+minutes +" minuti e "+ seconds+" secondi</p>"+
    "<h1>Scheda madre</h1>"+
    "<p>Produttore: "+baseboard.manufacturer+"</p>"+
    "<p>Modello: "+baseboard.model +"</p>"+
    "<p>Seriale: "+baseboard.serial +"</p>"+
    "<p>Versione BIOS: "+bios.version+" rilasciato il:"+bios.releaseDate+"</p>"+
    "<h1>CPU: </h1>"+
    "<p>Produttore: "+cpu.manufacturer+"</p>"+
    "<p>Brand: "+cpu.brand+"</p>"+
    "<p>Core: "+os.cpus().length+"</p>"+
    "<p>Cache L1D: "+cpu.cache.l1d/1000+" KB</p>"+
    "<p>Cache L1L: "+cpu.cache.l1i/1000+" KB</p>"+
    "<p>Cache L2: "+cpu.cache.l2/1000+" KB</p>"+
    "<p>Cache L3: "+cpu.cache.l3/1000000+" MB</p>"
);