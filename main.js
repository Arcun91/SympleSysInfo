const os = require('os');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
setInterval(function(){
    var time = os.uptime();
    var minutes = Math.floor(os.uptime()/60);
    var seconds = time - minutes * 60

    document.write (new JSDOM(
        "<p>Sistema Operativo: "+os.platform()+"<p>"+
        "<p>Architettura: "+os.arch()+"<p>"+
        "<p>CPU: "+os.cpus()[0].model+"<p>"+
        "<p>Core: "+os.cpus().length+"</p>"+
        "<p>Memoria Totale: "+Math.round(os.totalmem()/1000000)+" MB</p>"+
        "<p>Memoria Libera: "+Math.round(os.freemem()/1000000)+" MB</p>"+
        "<p>Acceso da: "+minutes +" minuti e "+ seconds+" secondi</p>"
    ).serialize());
    document.close();
}, 1000);




