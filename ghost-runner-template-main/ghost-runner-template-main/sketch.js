  
var towerImg, tower;
var doorImg, door, doorsGroup;
var door, climber, invisibleBlock;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;

var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}


function draw() {
  background(255);
  


  if (gameState === "play") {
    
    if(keyDown("space")){
  
      ghost.velocityY=-10;
    }
    if(keyDown("left")){
  
    
      ghost.x=ghost.x-10;
      
    }
    if(keyDown("right")){
  
   
      ghost.x=ghost.x+15;


    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
   
      if(tower.y>600){
        tower.y=300;
      }
    
      

      spawnDoors();
       
      ghost.collide(climbersGroup);

      if(ghost.y>600||invisibleBlockGroup.isTouching(ghost)){
        gameState="end";
      }


  drawSprites();
}
  if (gameState === "end"){
    background("black");
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
}

function spawnDoors(){
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);
    climber = createSprite(200,10);
    invisibleBlock = createSprite(200,15);
   invisibleBlock.width = climber.width;
   invisibleBlock.height = 2;
   

   climber.x=Math.round(random(50,550));
   door.x=climber.x
   invisibleBlock.x=climber.x;

   door.addImage(doorImg);
   climber.addImage(climberImg);
   
   door.velocityY = 1;
   climber.velocityY = 1;
   invisibleBlock.velocityY = 1;

   //change the depth of the ghost and door
   ghost.depth=door.depth;
   ghost.depth=ghost.depth+1;

   climbersGroup.add(climber);
   doorsGroup.add(door);
   invisibleBlockGroup.add(invisibleBlock);
   
   door.lifetime=620;
   climber.lifetime=620;
   invisibleBlock.lifetime=620;
  
 }
}

