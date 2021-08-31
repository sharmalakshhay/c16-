var sword,swordImage
var monster,monsterImage
var fruit,fruit1,fruit2,fruit3,fruit4;
var PLAY=1
var END=0
var gamestate=1
var score=0
var gameover,gameoverImage,gameoverSound
var backgroundImage
var slicesound


 function preload(){
 swordImage=loadImage("sword.png");
 monsterImage=loadImage("alien2.png")
 fruit1=loadImage("fruit1.png");
 fruit2=loadImage("fruit2.png"); 
 fruit3=loadImage("fruit3.png");
 fruit4=loadImage("fruit4.png");
 gameoverImage=loadImage("gameover.png");
 gameoverSound=loadSound("mixkit-arcade-space-shooter-dead-notification-272.mp3");
 backgroundImage=loadImage("download.jpg")
 slicesound=loadSound("fat-zombie-smash-1-sound-effect-69525147.mp3")
}

 function setup(){
  createCanvas(1000,800);
  
  background=createSprite(0,0,1000,800)
background.addImage(backgroundImage)
   background.scale=4.5
   
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage)
  sword.scale=0.5
   
 gameover=createSprite(240,200,40,40);
  gameover.addImage(gameoverImage);
   
  enemyGroup=new Group();
  fruitsGroup=new Group();
}

 function draw(){
   
  if(gamestate===PLAY){
    gameover.visible=false;
    if(fruitsGroup.isTouching(sword)){
    slicesound.play();
    fruitsGroup.destroyEach();
    score=score+2
    }
   if(enemyGroup.isTouching(sword)){
       gamestate=END
     gameoverSound.play();
   
   }
   sword.y=World.mouseY;
   sword.x=World.mouseX;
  }
   else if(gamestate===END){
     gameover.visible=true
   enemyGroup.setVelocityXEach(0)
    fruitsGroup.setVelocityXEach(0);
     enemyGroup.destroyEach();
     fruitsGroup.destroyEach();
   }

  drawSprites();
   
  textSize(14)
  fill("white")
  text("score:"+score,450,20)
   
  Enemy();
  Fruit();
 
}

 function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(580,200,20,20)
    monster.addImage(monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(7+score/10)
    monster.setLifetime=100
    
    enemyGroup.add(monster);
  }
}

 function Fruit(){
  if(World.frameCount%80===0){
    fruit=createSprite(580,250,20,20);
    fruit.scale=0.2
    r=Math.round(random(1,4));
    if(r==1){
    fruit.addImage(fruit1)
    }else if (r==2){
    fruit.addImage(fruit2)
    }else if(r==3){
    fruit.addImage(fruit3)
    }else if(r==4){
    fruit.addImage(fruit4)
    }
    
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=-(7+score/4);
    fruit.setLifetime=100;
    
    fruitsGroup.add(fruit);
  }
 }
