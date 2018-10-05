/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 20;

// Keep track of whether they've won
var gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#9e7a65");
  imageMode(CENTER);

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y,128,128);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y,128,128);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y,128,128);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y,128,128);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y,128,128);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y,128,128);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y,128,128);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y,128,128);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y,128,128);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y,128,128);
    }
    //gameLegend is a function that draws a rectangle with sausage dog
    //and a little bit of explanatory text
    gameLegend();
  }

  // Once we've displayed all decoys, we choose a location for the target
  // this ensures that there is a targetX value for the while loop to evaluate
  targetX = random(0,width);
  //while loop ensures sausage dog is not under the rectangle
  while(targetX>15 && targetX<265){
    targetX = random(0,width);
  }
  //this ensures that there is a targetX value for the while loop to evaluate
  targetY = random(0,height);
  //while loop ensures that dog is not under the rectangle
  while(targetY>15 && targetY<115){
  targetY = random(0,height);
  }
  //if you wanna cheat (or be sure the dog is actually showing)
  console.log(targetX,targetY);
  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY);
}

function draw() {
  if (gameOver) {
    //clear background and redraw sausage dog
    background('#9e7a65');
    image(targetImage, targetX, targetY);
    //we show gameLegend again because it's covered by the background
    gameLegend();
    // Prepare our typography
    textFont("Agency FB");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("YOU WINNED!",width/2,height/2);

    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width,targetImage.height);
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}

function gameLegend(){
  //rectangle on left corner
  fill('#4c4c4c');
  noStroke();
  rect(15,15,250,100);
  //Display sausage dog in rectangle
  fill('#847d79');
  ellipse(75,65,90);
  image(targetImage,75,65,95,95);
  //Diplay "WHERE IS MY DOG!!!" in rectangle
  textFont('Agency FB');
  textSize(24);
  textAlign(CENTER,CENTER);
  text('WHERE',195,35);
  text('IS MY',195,65);
  text('DOG!!!',195,95);
  }
