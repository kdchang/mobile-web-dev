window.onload = function() {
  console.log("Design by KD.Chang");
  var duck = document.getElementById('rubberduck');
  if(duck.getContext) {
    //initialize a 2d drawing context
    var ctx = duck.getContext('2d');
    drawDuck();
  } 
  else {
    alert("You Miss the chance to meet the Cute Duck!");
  }
  
  function drawDuck() { 
    //Background
    ctx.fillStyle = 'rgba(0, 205, 255, 1)';
    ctx.fillRect(0, 0, 750, 650);
    
    //Head
    ctx.beginPath();
    ctx.scale(2, 1.6);
    ctx.fillStyle = 'rgba(255, 255, 0, 1)'; 
    ctx.arc(175,175,60,0, Math.PI*2, true); 
    ctx.fill();
     
    //Body
    ctx.beginPath();
    ctx.scale(2, 1.6);
    ctx.fillStyle = 'rgba(255, 255, 0, 1)'; 
    ctx.arc(90,175,50,0, Math.PI*2, true); 
    ctx.fill();
    
    //Black Eyes
    ctx.beginPath();
    ctx.scale(1, 1.9);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'; 
    ctx.arc(73,55,5,0, Math.PI*2, true); 
    ctx.moveTo(165,165);
    ctx.arc(103,55,5,0, Math.PI*2, true);
    ctx.fill();
    
    //White eyes
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.arc(74, 53, 1, 0, Math.PI*2, true);
    ctx.moveTo(165,165);
    ctx.arc(102, 53, 1, 0, Math.PI*2, true);
    ctx.fill();
    
    //Mouth Down & Up
    ctx.beginPath();
    ctx.scale(4, 1);
    ctx.fillStyle = 'rgba(255, 118, 0, 1)'; 
    ctx.arc(22,67,5,0, Math.PI*2, true);  
    ctx.fill();
    
    ctx.beginPath();
    ctx.scale(1, 2);
    ctx.fillStyle = 'rgba(255, 118, 0, 1)';
    ctx.arc(22,33,3,0, Math.PI*1, true); 
    ctx.fill();
    
    //Right Hand
    ctx.beginPath();
    ctx.scale(1, 2);
    ctx.fillStyle = 'rgba(255, 255, 0, 1)';
    ctx.arc(33, 24, 2, 0, Math.PI*2, true);
    //Left Hand
    ctx.moveTo(165,165);
    ctx.arc(12, 24, 2, 0, Math.PI*2, true);
    ctx.fill();
    
  }
}