function fallbackCopyTextToClipboard(text){
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try{
        var successfull = document.execCommand('copy');
        var msg = successfull ? 'successful' : 'unsuccessful';
        console.log("Fallback was " + msg);					
    } catch (err) {
        console.log("Fallback error: ", err);					
    }
    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if(!navigator.clipboard){
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function(){
        swal("Text copied to clipboard", {
            icon: "success",
            closeOnClickOutside: true,
            buttons: false,
            timer: 1500,
        });
        console.log("Text copied");
    }, function(err){
        console.log("Copy failed: ", err)
        swal("Your browser does not support copy to clipboard", {
            dangerMode: true,
            closeOnClickOutside: true,
            buttons: false,
            timer: 1500,
        });
    });
}



function createSwalIcons(obj){
    swal(obj.text, {
        buttons: {
          copy: {
            text: "Copy to clipboard",
            value: "copy",
          },
          cancel: "Close",
        },
      })
      .then((value) => {
        switch (value) {       
          case "copy":
            copyTextToClipboard(obj.value);
            break;       
        }
      });
}
$( document ).ready(function() {

    const email={text:"Email us: holdadacardano@gmail.com",
                value:"holdadacardano@gmail.com",
                };
    const telegram={text:"Coming soon",
                    value:"coming soon",
                    };
    $( "#iconEmail" ).on( "click", function() {
        createSwalIcons(email);    
    });
    $( "#iconTelegram" ).on( "click", function() {
        createSwalIcons(telegram);    
    });
    
    
    $( ".copyToClipboard" ).on( "click", function() {
        copyTextToClipboard(this.previousSibling.textContent);
    });
                    
});

