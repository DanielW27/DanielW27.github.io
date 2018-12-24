$(document).ready(function() {
    // array with texts to type in typewriter
    var text = "Hello! My name's Daniel.";

    function typeWriter(text, i){
      if (i < (text.length)) {
       document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
        // wait for a while and call this function again for next character
        if(i === 5){
          setTimeout(function() {
            setTimeout(function() {
              typeWriter(text, i + 1)
            }, 120);
          }, 1300);
        } else {
          setTimeout(function() {
            typeWriter(text, i + 1)
          }, 120);
        }
      }
    }
  
    // start the text animation
    setTimeout(function(){
      typeWriter(text, 0);
    }, 2000);
});
