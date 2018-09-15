// Exercise 1 - Moving pictures
// Pippin Barr
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

// the image of a duckling holding a knife
var duckling;
// the current position of the duckling
var ducklingX;
var ducklingY;

// image of a fly
var flyImage;
//the current position of the fly
var flyImageX;
var flyImageY;


// preload()
//
// Load the two images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  duckling = loadImage("assets/images/bedoclock.png")
  flyImage = loadImage("assets/images/fly.png")
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // start the duckling off screen to the left of the canvas
  ducklingX = 0 - duckling.width/2;
  ducklingY = 640;

  // start the fly on the right corner
  flyImageX = 620
  flyImageY = 15

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;

  // Display the clown image
  image(clownImage,clownImageX,clownImageY);

  // move the duckling towards the right and slightly up
  ducklingX += 2;
  ducklingY -= 1;

  //Display the duckling

image(duckling,ducklingX,ducklingY);

// move the fly by moving it erratically towards the mouse

//calculate the distance in X and in Y
var xDistanceFly = mouseX - flyImageX;
var yDistanceFly = mouseY - flyImageY;

//Add 1/20th of the x and y distance to the fly's current (x,y)
// + an added random number, for more fun
var randomFly = random(-10,10)
flyImageX = flyImageX + xDistanceFly/20 + randomFly
flyImageY = flyImageY + yDistanceFly/20 + randomFly

//display the fly
image(flyImage,flyImageX,flyImageY,30,30)
}
