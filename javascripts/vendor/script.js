$(document).ready(function(){
 $("img").mouseenter(function(){
        $("img").fadeTo("fast",1.0);    
    });
 $("img").mouseleave(function(){
    $("img").fadeTo("fast",0.50);
        
     });
});