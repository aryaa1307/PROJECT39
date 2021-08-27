var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var gameState 

var distance;

var go,goi;

var ob,obGroup
var ob1img,ob2img,ob3img

var bellSound;

var o1i,o1i2,o1,o1Group;
var o2i,o2i2,o2,o2Group;
var o3i,o3i2,o3,o3Group;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2=loadAnimation("images/mainPlayer3.png");
 o1i=loadAnimation("opponent1.png","opponent2.png") 
 o1i2=loadAnimation("opponent3.png")
 o2i=loadAnimation("opponent4.png","opponent5.png")
 o2i2=loadAnimation("opponent6.png")
 o3i=loadAnimation("opponent7.png","opponent8.png") 
 o3i2=loadAnimation("opponent9.png") 
 goi=loadImage("gameOver.png") 
 ob1img=loadImage("obstacle1.png") 
 ob2img=loadImage("obstacle2.png") 
 ob3img=loadImage("obstacle3.png") 
  
bellSound=loadSound("sound/bell.mp3") ;
}

function setup(){
  
createCanvas(displayWidth, displayHeight);
  
// Moving background
path=createSprite(displayWidth,displayHeight-390 );
path.addImage(pathImg);

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation("m",mainRacerImg2)  
  
mainCyclist.scale=0.07;
  
distance=0  
go=createSprite(650,150)  
go.addImage(goi)
go.scale = 0.5 
go.visible=false  
  
gameState="start"  
  
o1Group=new Group();
o2Group=new Group ();
o3Group=new Group (); 
obGroup=new Group ();  
}

function draw() 
{

  camera.position.x= displayWidth/2
  camera.position.y= displayHeight/2

  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,500,100);
  
  if(gameState==="play")
{
  camera.position.x=path.position.x
  path.velocityX=-6
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
    
   distance = distance +Math.round(getFrameRate()/60); 
  
  //code to reset the background
  if(path.x < 0 )
  {
    path.x = width/2;
  } 
  
 if (keyDown("space"))
  {
   bellSound.play()  
  }

  if(keyDown("right"))
  {
    mainCyclist.x= mainCyclist.x+20
  }
  
  
  if(o1Group.isTouching(mainCyclist))
    {
     gameState="end"
     o1.velocityX=0
     o1.changeAnimation("c",o1i2) 
      //  o1Group.destroyEach();
  o2Group.destroyEach();
  o3Group.destroyEach();
  obGroup.destroyEach();
    }
  
  if(o2Group.isTouching(mainCyclist))
    {
     gameState="end"
      o2.velocityX=0
      o2.changeAnimation("a",o2i2)
        o1Group.destroyEach();
//  o2Group.destroyEach();
  o3Group.destroyEach();
  obGroup.destroyEach();
    }
  
  if(o3Group.isTouching(mainCyclist))
    {
     gameState="end" 
     o3.velocityX=0 
     o3.changeAnimation("b",o3i2)
       o1Group.destroyEach();
  o2Group.destroyEach();
// o3Group.destroyEach();
  obGroup.destroyEach(); 
    }
   
     if(obGroup.isTouching(mainCyclist))
    {
     gameState="end"
       o1Group.destroyEach();
  o2Group.destroyEach();
  o3Group.destroyEach();
  //obGroup.destroyEach(); 
    }
  
  if (frameCount%200==0)
  {
    obstacles();
  }  
    
   if (frameCount % 150==0)
 {   
  var r= Math.round (random(1,3)) 
  switch(r)
  {
    case 1:
    pink();
    break;   
    case 2:
    yellow();
    break;  
    case 3:
    reds()
    break;  
    default: break;     
   }  
  }
  
}
 else if (gameState==="end")
  {
     go.visible=true
     o1Group.setVelocityEach(0)
     o1Group.setLifetimeEach(-1)
    
     o2Group.setVelocityEach(0)
     o2Group.setLifetimeEach(-1)
    
     o3Group.setVelocityEach(0)
     o3Group.setLifetimeEach(-1)
    
     obGroup.setVelocityEach(0)
     obGroup.setLifetimeEach(-1)
    
     mainCyclist.velocityX=0
    mainCyclist.changeAnimation("m",mainRacerImg2)
    
     path.velocityX=0
     
    distance=0;  
    
     text("PRESS UP TO RESTART THE GAME!" , 500,200)
     
    if (keyDown("UP_ARROW"))
     {
       reset();
     } 
  } 
  else if (gameState==="start")
  {
    text("Move the Player forward with right arrow key and move the player up and down with your mouse. Press G to start. All the best!",50,50)
    if (keyDown("g"))
    {
      gameState="play"
    }
  }
}

function pink()
{
  o1=createSprite(1100,Math.round(random(50, 250)))
 // o1.velocityX=-(6*distance/150);
  o1.scale=0.06;
  o1.addAnimation("p1",o1i);
  o1.addAnimation("c",o1i2)
  o1.lifetime=170;
  o1Group.add(o1)
}

function yellow()
{
  o2=createSprite(1100,Math.round(random(50, 250)))
 // o2.velocityX=-(6*distance/150);
  o2.scale=0.06;
  o2.addAnimation("p2",o2i);
  o2.addAnimation("a",o2i2)
  o2.lifetime=170;
  o2Group.add(o2)
}

function reds()
{
  o3=createSprite(1100,Math.round(random(50, 250)))
 // o3.velocityX=-(6*distance/150);
  o3.scale=0.06;
  o3.addAnimation("p3",o3i);
  o3.addAnimation("b",o3i2)
  o3.lifetime=170;
  o3Group.add(o3);
}

function obstacles()
{
    ob=createSprite(1100,Math.round(random(50, 250)))
   // ob.velocityX=-(6+distance/100) 
    var rand = Math.round(random(1,6));
    switch(rand) 
    {
      case 1: ob.addImage(ob1img);
              break;
      case 2: ob.addImage(ob2img);
              break;
      case 3: ob.addImage(ob3img);
              break;
      default: break;
    }
    ob.scale=0.07
    ob.lifetime=170;
    obGroup.add(ob) 
   
}

function reset()
{
  gameState="play"
  distance=0
  go.visible=false
  o1Group.destroyEach();
  o2Group.destroyEach();
  o3Group.destroyEach();
  obGroup.destroyEach();
  mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
}

