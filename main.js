const os = require('os');
var generateDom = require("./js/generateDom.js");
var info = require("./js/info.js");

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

    Promise.all([
            info.getBiosInfo(), 
            info.getBaseboardInfo(),
            info.getCpuInfo()        
        ]).then(values =>{
        var dom = generateDom.generate(platform, minutes, seconds, values[0], values[1], values[2])
        document.write (dom.serialize());
        document.querySelector('head').innerHTML += '<link rel="stylesheet" href="style.css" type="text/css"/>';    
        document.close();
    });

    //info.getBiosInfo().then(function(res){
        
    //})
}, 3000);






