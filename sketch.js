var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey_running,monkey,backImg,backGround;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup,invisibleGround;
var score;

function preload(){
  backImg=loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}


function setup() {
  createCanvas(500, 400);
  
  
  
  backGround = createSprite(500,180,600,500);
  backGround.addImage("ground",backImg);
  backGround.x = backGround.width/2;
  backGround.velocityX = -6;
  
  invisibleGround = createSprite(400,380,500,10);
  invisibleGround.velocityX = -6;
  invisibleGround.visible=false;
  
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  
  
  FoodGroup = new Group();
  obstacleGroup = new Group(); 
  
  score=0;
}

function draw() {
  if(gameState===PLAY){
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+1;
    monkey.scale +=0.01;
  }
  
  
  
  if (backGround.x < 0){
      backGround.x = backGround.width/2;
     } 
  
  monkey.collide(invisibleGround);
  invisibleGround.x = invisibleGround.width/2;
  
  if(keyDown("space") && monkey.y>=320){
    monkey.velocityY=-15;
  }
  
  monkey.velocityY = monkey.velocityY+0.8
  
  food();
  stones();

  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
   
}
  }

else if(gameState===END) {
  gameOver();
}
drawSprites();  
if(gameState===END) {
  textSize(30);
    fill("white");
    text("Game Over!",180,200);
  
}
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : "+score,330,50);
 
}
function food(){
  if(frameCount%100===0){
    banana = createSprite(500,200,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.06;
    banana.velocityX=-5;
    banana.lifetime=100;
    monkey.depth=banana.depth+1;
    banana.y=Math.round(random(200,240));
    FoodGroup.add(banana);
  }
}

function stones(){
  if(frameCount%250===0){
    obstacle = createSprite(500,355,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-5;
    obstacle.lifetime=100;
    
    obstacleGroup.add(obstacle);
  }
}
function gameOver(){
  backGround.velocityX=0;
  invisibleGround.velocityX=0;
  
  monkey.visible=false;
  
    
    
  
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  
  
}