var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound


function preload(){
  trex_running = loadAnimation("Scuba3.png","Scuba4.png","Scuba6.png","Scuba7.png","Scuba8.png");
  trex_collided = loadAnimation("Scuba3.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  bgImage = loadImage("bg.jpg");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
   restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(100,00,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 0.7;
  
  ground = createSprite(200,height-100,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2 + 50);
  restart.scale = 0.5
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,600,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  trex.setCollider("rectangle",0,0,220,90);
  
  score = 0;
  
}

function draw() {
  
  background(bgImage);
  //displaying score
  push()
      textSize(30)
      textFont("algerian")
      fill("lightblue")
      stroke("white")
      text("Score: "+ score, width/2 + 550,80);
  pop()

  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        jumpSound.play();
        trex.velocityY = -12;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
 
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
        dieSound.play();
    }
  }
   else if (gameState === END) {
     console.log("hey")
      gameOver.visible = false;
      push()
      textFont("pristina")
      fill("white")
      stroke("lightblue")
      textSize(150)
      text("Game Over !!",width/2 - 250,height/2)
      pop()
    
      cloudsGroup.destroyEach()
      restart.visible = true;
     
      ground.velocityX = 0;
      trex.velocityY = 0
     
      //change the trex animation
      trex.changeAnimation("collided", trex_collided);
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}



function spawnObstacles(){
 if (frameCount % 120 === 0){
   var obstacle = createSprite(width,600,10,40);
   obstacle.velocityX = -6;
   
   /*obstacle.addImage(obstacle1);
      obstacle.setCollider("rectangle",0,0,500,20)
      obstacle.scale = 0.6
      */
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
      obstacle.setCollider("rectangle",0,0,400,300)
      obstacle.scale = 0.7
              break;
      case 2: obstacle.addImage(obstacle2);
      obstacle.setCollider("rectangle",0,0,500,200)
      obstacle.scale = 0.8
              break;
      case 3: obstacle.addImage(obstacle3);
      obstacle.setCollider("rectangle",0,0,200,300)
      obstacle.scale = 0.3
              break;
      case 4: obstacle.addImage(obstacle4);
      obstacle.setCollider("rectangle",0,0,300,350)
      obstacle.scale = 0.2
              break;
      case 5: obstacle.addImage(obstacle5);
      obstacle.setCollider("rectangle",0,0,525,200)
      obstacle.scale = 0.2
              break;
      case 6: obstacle.addImage(obstacle6);
      obstacle.setCollider("rectangle",0,0,300,350)
      obstacle.scale = 0.8
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
   
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
  
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
     cloud = createSprite(width+10,height-700,40,10);
    cloud.y = Math.round(random(height-500,height-400));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 534;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

