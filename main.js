const os = require('os');
var generateDom = require("./js/generateDom.js");
var info = require("./js/info.js");

document.getElementsByTagName("title")[0].innerHTML = "Info di sistema"

setInterval(function(){
    var time = os.uptime();
    var minutes = Math.floor(os.uptime()/60);
    var seconds = time - minutes * 60
    var platform;
    switch(os.platform()){
        case "darwin":platform = "MacOS"; break;
        case "freebsd":platform = "BSD"; break;
        case "linux":platform = "Linux"; break;
        case "openbsd":platform = "BSD"; break;
        case "sunos":platform = "SUN"; break;
        case "win32":platform = "Windows"; break;
        default: platform = os.platform(); break;
    }

    Promise.all(info.getInfos).then(values =>{
        var dom = generateDom.generate(platform, minutes, seconds, values[0], values[1], values[2], values[3], values[4], values[5], values[6])
        document.getElementById("content").innerHTML = dom.serialize();
    });
}, 1000);






