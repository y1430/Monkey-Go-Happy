//creating variables for Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//creating variables
var monkey , monkey_running,monkey_collided;
var banana ,bananaImage;
var  obstacle, obstacleImage;
var FoodGroup, ObstaclesGroup;
var ground,groundImage,invisibleGround;
var spawnObstacles,spawnBananas;
var survivalTime;

function preload(){
  
 monkey_running =        
  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
groundImage=loadImage("Woods.jpg");
monkey_collided=loadImage("sprite_0.png");
}

function setup() {
 createCanvas(600,400);
  
  ground=createSprite(600,200,600,400);
  ground.addImage("Woods",groundImage);
   ground.x = ground.width /2;
  ground.scale=1.5;

  monkey = createSprite(50,390,10,60);
  monkey.addAnimation("monkey_running",monkey_running);
   monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.1;
  
   invisibleGround = createSprite(300,400,600,10);
  invisibleGround.visible = false;
  console.log(ground.x); 
  
  ObstaclesGroup=createGroup();
  FoodGroup=createGroup();
  
  monkey.setCollider("rectangle",0,0,10,monkey.height);
  monkey.debug=false;
  
  survivalTime=0;
}

function draw() {
  
  
  if (gameState===PLAY){
   
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
 
    spawnObstacles();
  spawnBananas();
 ground.velocityX = -(4 + 3* survivalTime/100)
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
 if(keyDown("space")&& monkey.y >= 220) {
    monkey.velocityY = -12;
  }  
    
  //Gravity
 monkey.velocityY = monkey.velocityY + 0.8;
 monkey.collide(invisibleGround); 
  
    if (monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
    }
  if (monkey.isTouching(ObstaclesGroup)){
    gameState=END;
  }
     drawSprites(); 
    textSize(20);
     fill("yellow");
  text("Survival Time :"+survivalTime,20,50);
  }
if ( gameState===END){
  fill("yellow");
  textSize(40);
  text ("GAME OVER",150,250);
  fill("yellow");
  textSize(20);
  text("Press 'R' to restart",200,300);
  
  ground.velocityX = 0;
      monkey.velocityY = 0
      monkey.changeAnimation("collided",monkey_collided);
     
      //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     ObstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
  
  FoodGroup.destroyEach();
  
  if (keyDown("R")){
    survivalTime=0;
      reset();
      }
}

}

function spawnObstacles(){
  if (frameCount % 300 === 0){
   var obstacle = createSprite(300,370,10,40);
    obstacle.addImage(obstacleImage);
  obstacle.velocityX = -6//+ score/100);
   
   // generate random obstacles
    var rand = Math.round(random(0,1));
  
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
   obstacle.lifetime = 300;
   
   //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
 }
}
 
function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
   banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}
function reset(){
  gameState=PLAY;
  survivalTime=0;
//gameOver.visible=false;
//restart.visible=false;
  monkey.changeAnimation("monkey_running",monkey_running);
  ObstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  
}
