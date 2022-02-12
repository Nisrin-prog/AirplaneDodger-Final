var score
function preload() {
  planeImg = loadImage("assets/plane_preview.png");
  skyImg = loadImage("assets/sky1.png");
  spaceImg = loadImage("assets/outerspace.jpg");
  explosionImg = loadImage("assets/Explosion1.gif");
  meteorImg = loadImage("assets/meteor1.gif");
  gameoverImg = loadImage("assets/GameOver.png");
  youWonImg = loadImage("assets/You_Won.png")
}
function setup() {
  createCanvas(600, 700);
  edges = createEdgeSprites();
  gameState = "wait";
  space = createSprite(width / 2, height / 2);
  space.addImage(spaceImg);
  space.velocityY = +1;
  space.scale = 2.75;

  plane = createSprite(100, 575);
  plane.addImage("mainplane",planeImg);
  plane.addImage("explosion",gameoverImg)
  plane.scale = 0.5;
  plane.setCollider("rectangle", 0, 0, 350, 250);
  gameSound = createAudio("assets/gameSounds.mp4");
  gameSound.volume(0.1);

  meteorGroup = new Group();
  if (gameState === "wait") {
    background(spaceImg);
    input = createInput("").attribute("placeholder", "Enter the name");
    input.position(width / 2 - 100, height / 2 - 100)
    input.class("customInput")
    button = createButton("PLAY");
    button.position(width / 2 - 85, height / 2 - 50)
    console.log(input.value());
    if (input.value() !== undefined) {
      button.mousePressed(function () {
        gameState = "play";
      });
    }
    button.class("playButton")
    gameTitle = createElement("h2");
    gameTitle.position(width / 2 - 150, 50)
    gameTitle.class("gameTitle")
    gameTitle.html("Airplane Dodger")
  }
  score = 0;
}

function draw() {

  if (gameState === "play") {
    background(0);
    hideElements()
    plane.x = mouseX;
    if (space.y > 425) {
      space.y = 375;
    }
    if (meteorGroup.isTouching(plane)) {
      gameState = "end";
      plane.changeImage("explosion")
      plane.scale = 1.2
    }
    obstacles();
    drawSprites();
    if(score>=2){
      imageMode (CENTER)
      image(youWonImg,width/2,height/2)
     // meteorGroup.destroyEach()
      meteorGroup.setVelocityEach(-1)
      gameState = "end"
    }
  }
  if (gameState === "end") {
    plane.destroy()
    meteorGroup.destroyEach()
  }
  if (gameState !== "wait") {
    textSize(24);
    fill("white");
    text(this.input.value() + ":" + score, 50, 50);
  }
}

function obstacles() {
  if (frameCount % 80 === 0) {
    meteor = createSprite(random(0, width), 0);
    meteor.addImage(meteorImg);
    meteor.velocityY = 5;
    meteor.velocityX = -2;
    meteor.scale = 0.08;
    meteorGroup.add(meteor);
    if (meteor.isTouching(edges[1])) {
      score = score + 1
    }

    meteor.setCollider("circle", 0, 0, 50);
    meteor.lifetime = 300;


  }
  if (frameCount % 100 === 0) {
    meteor = createSprite(650, random(50, 350));
    meteor.addImage(meteorImg);
    meteor.velocityY = 5;
    meteor.velocityX = -2;
    meteor.scale = 0.08;
    console.log(meteor.y);
    console.log(meteor.lifetime);
    meteorGroup.add(meteor);
    if (meteor.isTouching(edges[1])) {
      score = score + 1
    }
    meteor.setCollider("circle", -50, 0, 50);
    meteor.lifetime = 300;
  }


}
function hideElements() {
  gameTitle.hide()
  button.hide()
  input.hide()
}
