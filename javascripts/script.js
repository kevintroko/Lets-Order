$(document).ready(function(){
 $("#nuggets").mouseenter(function(){
        $("#fast").fadeTo("fast",1.0);    
    });
 $("#nuggets").mouseleave(function(){
    $("#nuggets").fadeTo("fast",0.50);
        
     });
});