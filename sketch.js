var runningMan;
var road;
var running_animation;
var backgroundAnimation;
var movingBackground;
var coinAnimation;
var obstacle;
var bus;
var gameState = "play";
var obstaclesGroup,coinsGroup;
var score = 0;
var deadAnimation;
var gameOver;
var gameOverImage;


function preload(){
  running_animation = loadAnimation(
    "images/Run1.png",
    "images/Run2.png",
    "images/Run3.png",
    "images/Run4.png",
    "images/Run5.png",
    "images/Run6.png",
    "images/Run7.png",
    "images/Run8.png",
    "images/Run9.png",
    "images/Run10.png"

  );
   backgroundAnimation = loadImage("images/Street1.png");
   obstacle = loadImage("images/bus01.png");
   coinAnimation = loadAnimation(
     "images/Gold_1.png",
     "images/Gold_2.png",
     "images/Gold_3.png",
     "images/Gold_4.png",
     "images/Gold_5.png",
     "images/Gold_6.png",
     "images/Gold_7.png",
     "images/Gold_8.png",
     "images/Gold_9.png",
     "images/Gold_10.png"

     );
     deadAnimation = loadAnimation("images/Dead.png");

     gameOverImage = loadImage("images/gameOver.png");

}

function setup() {
  createCanvas(960,600);

 movingBackground = createSprite(480,300,960,600);
 movingBackground.addImage(backgroundAnimation);
 movingBackground.velocityX = -5;
 movingBackground.scale = 0.6;
 

  runningMan = createSprite(50, 500, 100, 100);
  runningMan.addAnimation("running",running_animation);
  runningMan.addAnimation("dead",deadAnimation);
  runningMan.scale = 0.1;


  road = createSprite(400,600,1600,10);
  road.x = road.width/2;

  gameOver = createSprite(480,400,50,50);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.05;


  obstaclesGroup = createGroup();
  coinsGroup = createGroup();


}

function draw() {
 console.log(movingBackground.width);  
 
    
   if(gameState == "play"){

    road.velocityX = -8;
    if(movingBackground.x<400){
      movingBackground.x = movingBackground.width/4;
    }
  
      spawnCoins();
      spawnObstacles();

      if(keyIsDown(UP_ARROW) && runningMan.y>=500){
        runningMan.y = runningMan.y - 5;
     }
 
     if(keyIsDown(DOWN_ARROW) && runningMan.y<=600){
       runningMan.y = runningMan.y + 5;
    }
    
     if(runningMan.isTouching(obstaclesGroup)){
            gameState = "end";
            
     }

     if(runningMan.isTouching(coinsGroup)){
           score = score+1;
           coinsGroup.get(0).destroy();

     }

     gameOver.visible = false;

   }
   else if(gameState == "end"){
        
    movingBackground.velocityX = 0;
    runningMan.changeAnimation("dead",deadAnimation); 
    coinsGroup.setVelocityXEach(0);
    coinsGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);

    gameOver.visible = true;

   }

   
  runningMan.collide(road);
  drawSprites();
  textSize(30);
  fill("white");
  text("score : " + score,820,50);
}

  function spawnCoins(){
   if(frameCount % 60 == 0){
    var coin = createSprite(900,random(500,600),70,70);
    coin.addAnimation("rotatingCoin",coinAnimation);
    coin.velocityX = -6;
    coin.lifetime = 160;
    coin.scale = 0.07;
    coinsGroup.add(coin);
   }

  }
 
   function spawnObstacles(){
    if(frameCount % 120 == 0){
     var bus = createSprite(900,random(500,600),70,70);
     bus.addImage(obstacle);
     bus.velocityX = -9;
     bus.lifetime = 160;
     bus.scale = 0.08;
     obstaclesGroup.add(bus);
    }


  }

  