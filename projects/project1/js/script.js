/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity
var playerX;
var playerY;
var playerRadius = 70;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed = 2;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 50;

// Prey position, size, velocity
var preyX;
var preyY;
var preyRadius = 50;
var preyVX;
var preyVY;
var preyMaxSpeed = 4;
// prey time value for perlin noise
var preyTX;
var preyTY;
// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 200;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;
//Images
var leaf1Image;
var leaf2Image;
var leaf3Image;
var preyImage;
var predatorImage;

var leafSize;
var numLeaves = 200;

function preload(){
leaf1Image = loadImage("assets/images/leaf1.png");
leaf2Image = loadImage("assets/images/leaf2.png");
leaf3Image = loadImage("assets/images/leaf3.png");
preyImage = loadImage("assets/images/prey.png");
predatorImage = loadImage("assets/images/predator.png");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);

  noStroke();

  setupPrey();
  setupPlayer();

  preyTX = 0.0;
  preyTY = 1.0;
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width/5;
  preyY = height/2;
  preyVX = 0;
  preyVY = 0;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4*width/5;
  playerY = height/2;
  playerHealth = playerMaxHealth;
}



// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(110,181,151);
  // draws leaves over the leaves over the background
  // obviously it looks absolutely awful because new leaves are generated
  //with every loop and it's a chaotic storm, which was not the point
  //I would have needed to use arrays to store the leaves's position and angles
  //but I don't know how to use arrays
  leafBackground();

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  }
  else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  }
  else if (playerY > height) {
    playerY -= height;
  }
}

// updateHealth()
//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  playerHealth = constrain(playerHealth - 0.5,0,playerMaxHealth);
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX,playerY,preyX,preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth,0,playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  //change the prey's velocity with a perlin noise function
  preyVX = map(noise(preyTX),0,1,-preyMaxSpeed,preyMaxSpeed);
  preyVY = map(noise(preyTY),0,1,-preyMaxSpeed,preyMaxSpeed);
  //I spent at least 3 hours trying to get this damned noise to work
  preyTX = preyTX + 0.01;
  preyTY = preyTY + 0.01;

  preyX += preyVX;
  preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  }
  else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  }
  else if (preyY > height) {
    preyY -= height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  image(preyImage,preyX,preyY,preyRadius,preyRadius);
  //fill(preyFill,preyHealth);
  //ellipse(preyX,preyY,preyRadius*2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  image(predatorImage,playerX,playerY,playerRadius,playerRadius);
  //fill(playerFill,playerHealth);
  //ellipse(playerX,playerY,playerRadius*2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You ate " + preyEaten + " prey\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);
}
//setupBackground()
//
//Initialises the background's appearance, with leaves on the ground and such
function leafBackground(){
  // use a for loop to draw many leaves
  imageMode(CENTER);
  for (var i = 0; i < numLeaves; i++) {
    // Choose a random location for a leaf
    var leafX = random(0,width);
    var leafY = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    //leaf size is randomly generated
    leafSize = random(48,96);
    //leaf angle is also randomly generated
    var angle = random(0,360);
    //use push()and pop() so that everything I do after calling this function
    //is not also rotated
    push();
    rotate(angle);
    //rotate() works by rotating the images on an axis around (0,0)
    // a couple of these leaves are thus outside the canvas
    //this can be changed by creating a vector and using it as the axis
    //but I sincerily do not understand how
    // Use the random number to display one of the 3 leaf images, each with 1/3 probability
    if (r < 0.33) {
      image(leaf1Image,leafX,leafY,leafSize,leafSize);
    }
    else if (r < 0.66) {
      image(leaf2Image,leafX,leafY,leafSize,leafSize);
    }
    else if (r < 0.1) {
      image(leaf3Image,leafX,leafY,leafSize,leafSize);
    }
    pop();
  }
}
