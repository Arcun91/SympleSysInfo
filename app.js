const os = require('os');
var generateDom = require("./js/generateDom.js");
var info = require("./js/info.js");
var jQuery = require("jQuery");
var $ = jQuery;

document.getElementsByTagName("title")[0].innerHTML = "Info di sistema"

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
Promise.all(info.home).then(values =>{
    var dom = generateDom.home(platform, minutes, seconds, values[0])
    document.getElementById("content").innerHTML = dom.serialize();
});

window.onhashchange = function() { 
    Promise.all(info[window.location.hash.substring(1)]).then(values =>{
        var dom = generateDom[window.location.hash.substring(1)](values);
        if(window.location.hash.substring(1) == "home"){
            dom = generateDom.home(platform, minutes, seconds, values[0])
        }
        document.getElementById("content").innerHTML = dom.serialize();
    })
}











