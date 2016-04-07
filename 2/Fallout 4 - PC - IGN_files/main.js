
var atFrame="intro";
var imgColl = [];
// var imgURLs = ["fr3.png","noise.png","cat_sprite.jpg"];
// var imgCounter = 0;

window.onload = function() {
  
  //image preloader
  // for (var i = 0; i < 3; i++){
  //   imgColl[i] = new Image();
  //   imgColl[i].src = imgURLs[i];
  //   imgColl[i].onload = loadCounter();
  // }  
  
  //animateTo('frame4');
  animateTo('intro');

  $("#mainContainer").click(function(){
    window.open(clickTag, "_blank");
    animateTo('endFrame');
  });

 $("#mainContainer").mouseover(function(){
     if (atFrame=="endFrame" || atFrame=="clickEndFrame") {$(".white-button").animate({'opacity':'0'}, 100, "ease-out", null, 0);};
  });

  $("#mainContainer").mouseout(function(){
     if (atFrame=="endFrame" || atFrame=="clickEndFrame") {$(".white-button").animate({'opacity':'1'}, 100, "ease-out", null, 0)};});
}

// function loadCounter(){
  
//   imgCounter++;
  
//   if (imgCounter == imgURLs.length) {
//       animateTo('intro');
//     }
// }

function animateTo(frameName) {
  
  //atFrame=frameName;

  switch (frameName) {
    case 'replay':
    break;
    
    case 'intro':
      
      $("#frame1").css("opacity","1");
      
      $.delayedCall(1, function() {
        $(".txt_second").animate({'left':'155px'},200, "ease-out", null, 0);
      });

      $.delayedCall(1.2, function() {
        $(".txt_doesnt").animate({'left':'155px'},200, "ease-out", null, 0);
      });

      $.delayedCall(2.7, function() {
        animateTo('frame2');
      });
    
    break;

    case 'frame2':

      //cat
    $("#frame1").hide().remove();
    $("#frame2").css("opacity","1");
      
      //cat anim
      $.delayedCall(.2, function() {
        //$("#frame2").animate({'background-size':'140%'},200, "ease-out", null, 200);
        $("#frame2").animate({'scale':'1.4','background-position':'0px 10px'},200, "ease-out", null, 200);
      });

     $.delayedCall(.35, function() {
       $("#typeCont1").css("opacity","1")
       typer("#typeCont1","<p>WHAAT?</p>");
      });

      $.delayedCall(1.7, function() {
        animateTo('frame3');
      });
      
    break;

    case 'frame3':
      
     $("#frame2").hide().remove();
     $("#frame3").css("opacity","1");

      $.delayedCall(.2, function() {
        $(".txt_yep").animate({'left':'305px'},150, "ease-out", null, 0);
      });

      $.delayedCall(1.6, function() {
        animateTo('frame4');
      });

    break;

    case 'frame4':

      //dog
    $("#frame3").hide().remove();
    $("#frame4").css("opacity","1");
     
      $.delayedCall(.2, function() {
       // $("#frame4").animate({'background-size':'150%'},200, "ease-out", null, 0);
        $("#frame4").animate({'scale':'1.4'},200, "ease-out", null, 200);
      });


      $.delayedCall(.35, function() {
       $("#typeCont2").css("opacity","1")
       typer("#typeCont2","<p>WHAAT?</p>");
      });

      $.delayedCall(1.5, function() {
        animateTo('frame5');
      });
      
    break;

    case 'frame5':
      
     $("#frame4").hide().remove();
     $("#frame5").css("opacity","1");

      $.delayedCall(.5, function() {
        $(".txt_even").animate({'left':'192px'},150, "ease-out", null, 0);
      });

      $.delayedCall(2, function() {
        animateTo('frame6');
      });

    break;

    case 'frame6':
      
     $("#frame5").hide().remove();
     $("#frame6").css("opacity","1");

     $.delayedCall(.5, function() {
        $(".logo").animate({'opacity':'1'},400, "ease-out", null, 0);
      });

      $.delayedCall(1.5, function() {
        $(".txt_be").animate({'left':'214px'},150, "ease-out", null, 0);
      });

      $.delayedCall(1.8, function() {
        $(".txt_that").animate({'left':'214px'},150, "ease-out", null, 0);
      });

     $.delayedCall(2.5, function() {
        $(".white-button, .black-button").animate({'opacity':'1'},150, "ease-out", null, 0);
         atFrame="endFrame";
      });

    break;

      case 'endFrame':
        $("#frame1, #frame2, #frame3, #frame4, #frame5").hide().remove();
        $("#frame6").css("opacity","1");
        $(".logo").animate({'opacity':'1'},0, "ease-out", null, 0);
        $(".txt_be").animate({'left':'214px'},0, "ease-out", null, 0);
        $(".txt_that").animate({'left':'214px'},0, "ease-out", null, 0);
        $(".white-button, .black-button").animate({'opacity':'1'},0, "ease-out", null, 0);
        atFrame="endFrame";

      break;
  }
}

function typer(container,html){

  $(container).typer([html],{
    delay:100, 
    duration:400, 
    endless:false,
    char:'',
    onType:function(){}, 
    afterAll:function(){},
    afterPhrase:function(){}});
}
