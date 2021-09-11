var submarino, submarino1,submarino2;
var submarinoIMG,submarino1IMG,submarino2IMG
var torpedo,torpedoIMG,torpedoGroup;
var barco,barcoIMG,barcoGroup;
var barcow,barcowIMG,barcowGroup;
var reiniciar,reiniciarIMG;
var gameOver, gameOverIMG;
var fondo,fondoIMG;
var invW;
var invS;
var lol;
var nais;
var thing;
var explosion;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

function preload(){
  
  submarinoIMG = loadImage("submarino.png");
  submarino1IMG = loadImage("submarino1.png");
  submarino2IMG = loadImage("submarino2.png");
  gameOverIMG = loadImage("gameOver.png");
  reiniciarIMG = loadImage("reiniciar.png");
  torpedoIMG = loadImage("torpedo.png");
  fondoIMG = loadImage("fondo.png");
  barcoIMG = loadImage("barco1.png");
  barcowIMG = loadImage("barco2.png");
  lol = loadSound("lol.mp3");
  nais = loadSound("nais.mp3");
  thing = loadSound("thing.mp3");
  explosion = loadSound("explosion.mp3");

  torpedoGroup = new Group();
  
  barcowGroup = new Group();
  
  barcoGroup = new Group();
  
}

function setup() {
 
  fondo = createSprite(100,200);
  fondo.scale = 4;
  fondo.addImage("fondo",fondoIMG);
  fondo.x = fondo.width/2;
  
  submarino = createSprite(600,300,30,20);
  submarino.addImage("submarino",submarinoIMG);
  submarino.scale = 0.3;
  submarino.setCollider("rectangle",0,-50,40,40);
  submarino.debug = true;
  
  submarino1 = createSprite(600,300,30,20);
  submarino1.addImage("submarino1", submarino1IMG);
  submarino1.x = submarino.x;
  submarino1.visible = false;
  submarino1.scale = 0.3;
  
  submarino2 = createSprite(600,300,30,20);
  submarino2.addImage("submarino2", submarino2IMG);
  submarino2.visible = false;
  submarino2.scale = 0.3;
  
  gameOver = createSprite(300,200,30,20);
  gameOver.addImage("gameOver", gameOverIMG);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  reiniciar = createSprite(300,250,30,20);
  reiniciar.addImage("reiniciar", reiniciarIMG);
  reiniciar.scale = 0.5;
  reiniciar.visible = false;
  
  invW = createSprite(400,160,1090,5);
  invW.visible = false;
  
  invS = createSprite(400,399,1090,5);
  invS.visible = false;
  
  
}

function draw() {
  createCanvas(1020,400);
  background("withe");
  
        fill ("black");
  text("Score "+score,500,50);
  
  fondo.depth = text.depth;
  text.depth = +1;
  
  if(gameState==PLAY){
    
  fondo.velocityX = -(4+3*score/100);
  score = score+Math.round(getFrameRate()/60);
    
  fondo.depth = text.depth;
  text.depth = +1;
    
    submarino1.y = submarino.y;
    submarino2.y = submarino.y;
    submarino1.x = submarino.x;
    submarino2.x = submarino.x;
  
    fondo.velocityX = -1;
    if (fondo.x < 150){
      fondo.x = fondo.width/2;
    } 
    
    if(keyDown("W")){
      
      submarino.y = submarino.y -5;
      
    }

    if(keyDown("A")){
      
      submarino.x = submarino.x -5;
      
    }
    
  if(keyDown("S")){
      
    submarino.y = submarino.y +5;
      
  }

  if(keyDown("D")){
      
    submarino.x = submarino.x +5;
    
  }
    
  if(score==250){
    
   nais.play(); 
    
     }
    
  if(score==1500){
    
    thing.play(); 
       
    }

  if(score==2700){
    
   lol.play(); 
    
     }
    
    if(torpedoGroup.isTouching(submarino)){
      
    explosion.play();
    submarino.visible = false;
    submarino1.visible = true;
    gameState = END;
    fondo.velocityX = 0;
    torpedoGroup.setVelocityXEach(0);
    barcoGroup.setVelocityXEach(0);
    barcowGroup.setVelocityXEach(0);
    torpedoGroup.setLifetimeEach(-1);
    barcoGroup.setLifetimeEach(-1);
    barcowGroup.setLifetimeEach(-1);
          score = 0;

      
    }
    
  if(barcoGroup.isTouching(submarino)){
      
    explosion.play();
    submarino.visible = false;
    submarino2.visible = true;
    gameState = END;
    fondo.velocityX = 0;
    torpedoGroup.setVelocityXEach(0);
    barcoGroup.setVelocityXEach(0);
    barcowGroup.setVelocityXEach(0);
    torpedoGroup.setLifetimeEach(-1);
    barcoGroup.setLifetimeEach(-1);
    barcowGroup.setLifetimeEach(-1);
        score = 0;
      
    } 
    
    if(barcowGroup.isTouching(submarino)){
      
    explosion.play();
    gameState = END;
    submarino.visible = false;
    submarino2.visible = true;
    fondo.velocityX = 0;
    torpedoGroup.setVelocityXEach(0);
    barcoGroup.setVelocityXEach(0);
    barcowGroup.setVelocityXEach(0);
    torpedoGroup.setLifetimeEach(-1);
    barcoGroup.setLifetimeEach(-1);
    barcowGroup.setLifetimeEach(-1);
    
    score = 0;
      
    }
    
    spawnTorpedos();
    
    spawnBarco();
    
    spawnBarcow();
    
    submarino.collide(invW);
    submarino.collide(invS);
    
  }else if(gameState==END){
    
    gameOver.visible = true;
    reiniciar.visible = true;
    fondo.velocityX = 0;
    torpedoGroup.setVelocityXEach(0);
    barcoGroup.setVelocityXEach(0);
    barcowGroup.setVelocityXEach(0);
    torpedoGroup.setLifetimeEach(-1);
    barcoGroup.setLifetimeEach(-1);
    barcowGroup.setLifetimeEach(-1);
    thing.stop();
    lol.stop();
    
  }
    
  if(mousePressedOver(reiniciar)){
     
    reset();
    
     }
  
 drawSprites();
}

function spawnTorpedos (){
  
  if(frameCount%50==0){
    // facil: 100 normal: 50 dificil: 25 IMPOSSIBLE: 10
    torpedo = createSprite(0,300,50,10);
    torpedo.addImage("barco",torpedoIMG);
    torpedo.scale = 0.3;
    torpedo.y = random(400,230);
    torpedo.velocityX = (6+score/100);
    torpedo.lifetime = 300;
    torpedoGroup.add(torpedo);
    
  }
  
}

function spawnBarco(){
  
  if(frameCount%250==0){
        // facil: 500 normal: 250 dificil: 100 IMPOSSIBLE: 50
    barco = createSprite(-30,25,50,10);
    barco.addImage("barco",barcoIMG);
    barco.scale = 0.3;
    barco.velocityX = (6+score/100);
    barco.lifetime = 300;
    barcoGroup.add(barco);
    
  }
  
}

function spawnBarcow(){
  
  if(frameCount%600==0){
            // facil: 1000 normal: 500 dificil: 250 IMPOSSIBLE: 100
    barcow = createSprite(-30,70);
    barcow.addImage("barcow",barcowIMG);
    barcow.scale = 0.5;
    barcow.velocityX = (6+score/100);
    barcow.lifetime = 300;
    barcowGroup.add(barcow);
    
  }
  
}

function reset(){
  
    gameState = PLAY;
    torpedoGroup.destroyEach();
    barcoGroup.destroyEach();
    barcowGroup.destroyEach();
    reiniciar.visible = false;
    gameOver.visible = false;
    submarino1.visible = false;
    submarino2.visible = false;
    submarino.visible = true;
    score = 0;
    
}
