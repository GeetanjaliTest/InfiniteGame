var ground, groundImg;
var appleImg, bananaImg, pearImg, orangeImg;
var strawberryVendImg, halloweenImg;
var star, starImg;
var bee, beeImg;
var score=0;
var gameState="play";
var distance =0;


function preload(){
  groundImg= loadImage("ground2.png");
  appleImg=loadImage("apple.png");
  bananaImg=loadImage("banana.png");
  pearImg=loadImage("pear.png");
  orangeImg=loadImage("orange.png");
  strawberryVendImg= loadImage("strawberry_vendor.png");
  halloweenImg=loadImage("halloween.png");
  strawberryVendImg= loadImage("strawberry_vendor.png");
  starImg= loadImage("star.png");
  beeImg= loadImage("bee.png");

}

function setup() {
 createCanvas(windowWidth, windowHeight);
  
 
ground = createSprite(width/2,height-100,width,500);
  ground.addImage("ground",groundImg);
  ground.x = width /2;
  ground.velocityX = -15;     
  ground.scale=5;
  
  bee = createSprite(50,height-50,20,50);
  bee.addImage(beeImg);
  bee.scale=0.2
  
  invisibleGround = createSprite(width/2,height-50,width,125);
  invisibleGround.visible = false;
  
  edges= createEdgeSprites();
  
  halloweenG= new Group();
  strawberryG= new Group();
  fruitsG= new Group();
  starG= new Group();
  
  
}

function draw() {
   background("lightblue");
  
   textSize(25);
   text("score:"+score,30,50);

   console.log("beey :"+bee.y);
   distance=frameCount;
   console.log("distance"+distance);
  
  if(gameState==="play"){
    score = score + Math.round(getFrameRate()/60);
    if(ground.x<0)
      {
        ground.x= width/2;
      }

    if(keyDown("space")&& bee.y>=100)
      {
        bee.velocityY=-10;
        camera.position.x=bee.x;
        camera.position.y=bee.y;
        text("score:"+score,camera.position.x-600,camera.position.y-200);
      }
     bee.velocityY=  bee.velocityY+0.5;

    bee.collide(invisibleGround); 

    spawnFruits();
    createStrawberryVendor();
    createObstacles();

    if(fruitsG.isTouching(bee))
      {
        //fruitsG.destroyEach();
        textSize(25);
        fill("green");
        text("Added 5 points",300,300);
        score= score+5;
      }

     if(strawberryG.isTouching(bee))
      {
        //strawberryG.destroyEach();
        textSize(25);
        fill("green");
        text("Added 50 points",300,300);
        score= score+50;
        starG.setVisibleEach(true);
        starG.setVelocityYEach(-10);
      }

      if(halloweenG.isTouching(bee))
        {
          textSize(25);
          fill("green");
          text("Lost all points",300,300);
          score=0;

        }



    drawSprites();
  }

 if (distance>1000){
 
   gameState="end";
    fill("yellow");
    textSize(30);
    text("Game Over", width/16,height/2- 50)
    text("Final Score:"+score, width/16,height/2- 10)
  }
}

function spawnFruits(){
 if (frameCount % 200 === 0){
   var fruits = createSprite(600,height-130,20,30);
   fruits.velocityX = -7;

    var num = Math.round(random(1,4));
    switch(num) {
      case 1: fruits.addImage(appleImg);
              break;
      case 2: fruits.addImage(bananaImg);
              break;
      case 3: fruits.addImage(pearImg);
              break;
      case 4: fruits.addImage(orangeImg);
              break;
              
      default: break;
    }
   
          
    fruits.scale = 0.12;
    fruits.lifetime = 300;
    fruitsG.add(fruits);
   
 }
}


function createStrawberryVendor(){
  if (frameCount % 150 == 0) {
    var sBerryVendor = createSprite(Math.round(random(50,450)),height-95,20,30);
    sBerryVendor.addImage(strawberryVendImg);
    sBerryVendor.scale=0.1;
    sBerryVendor.velocityX = -7;
    sBerryVendor.lifetime = 150;
    
    var star = createSprite(sBerryVendor.x,sBerryVendor.y,10,40);
    star.addImage(starImg);
    star.scale=0.02;
    star.velocityX = -7;
    star.lifetime = 150;
    star.visible= false;
    
    strawberryG.add(sBerryVendor);
    starG.add(star);
  }
}

function createObstacles(){
  if (frameCount % 300 == 0) {
    var halloween = createSprite(Math.round(random(150,600)),height-95,20,30);
    halloween.addImage(halloweenImg);
    halloween.scale=0.05;
    halloween.velocityX = -7;
    halloween.lifetime = 150;
    halloweenG.add(halloween);
  }
}
