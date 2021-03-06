/*********************************************************

Exercise 2 - The Artful Dodger
Pippin Barr

Starter code for exercise 2.

*********************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 50;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 5;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much faster the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

// How many dodges the player has made
var dodges = 0;

//Values of different colors
var red;
var green;
var blue;

//Avatar and enemy opacity Values
var avatarOpacity;
var enemyOpacity;

//Introduction text text opacity
var textOpacity = 256


// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  //Basic opacity
  avatarOpacity = 256
  enemyOpacity = 256

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {


  // the avatar speed increase or decrease with every successful dodge
  var avatarSpeedIncrease = random(-2, 2.1);

  // the avatar size increase or decrease with every successful dodge
  var avatarSizeIncrease = random(-5, 8);

  // values of the color variables
  red = 200 + avatarY/10
  green = 200 + avatarX/10
  blue = 250 - (avatarX+avatarY)/20
  // A color changing background
  background(red,green,blue);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  //avatar opacity value changes when the avatar does not move
  if (avatarVX === 0 && avatarVY === 0) {
   avatarOpacity = constrain(avatarOpacity-=3, 0, 256);
  }

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

// Avatar opacity goes up if the avatar moves
  if (avatarVX != 0 || avatarVY != 0){
    avatarOpacity = constrain(avatarOpacity += 10, 0, 256);
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemySize = 50;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
    //Reset the avatar size and speed
    avatarSize = 50
    avatarSpeed = 10
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 50;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
    avatarSize = 50
    avatarSpeed = 10
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + enemySizeIncrease;
    //Modify the avatar's speed and size to make the game harder
    avatarSize = constrain(avatarSize += avatarSizeIncrease, 10,height/2);
    avatarSpeed = constrain(avatarSpeed += avatarSpeedIncrease, 2, 20);
  }

  // Display the current number of successful in the console
  console.log(dodges);


  // The player is has a white edge
  stroke(256, avatarOpacity)
  strokeWeight(5)
  // The player is transparent
  fill(0,0);
  // Draw the player as a circle
  ellipse(avatarX,avatarY,avatarSize,avatarSize);

  // the enemy does not have a stroke
  noStroke()
  //Set the enemy's opacity in relation to the avatar's position
  enemyOpacity = 256- avatarX/2
  // The enemy is grey
  fill(100,enemyOpacity);
  // Draw the enemy as a circle
  ellipse(enemyX,enemyY,enemySize,enemySize);

  //Text appears that tells the player how to player how to player
  textFont("Agency FB");
  textOpacity -= 1;
  textSize(48);
  textAlign(CENTER);
  fill(256,textOpacity);
  text("Use ← ↑ ↓ → to move", width/2, 450);

  // if dodges = 0, red text that says "you lose" and fades
  if (dodges === 0){
    fill(200,150,150,256-enemyX)
    textSize(72);
    text("YOU LOSE",width/2,height/2);
  }


  var dodgesText= dodges

  // Display the current number of successful dodges in the game
  // Text changes color depending on position and gets darker as the ennemy gets bigger
  fill(blue-enemySize, green-enemySize, red-enemySize);
  textSize(24);
  textAlign(RIGHT);
  text("Dodges:", 450,25);
  //This text is pale red and updates with the number of dodges
  fill(200,150,150);
  textAlign(LEFT);
  text(dodgesText,465,25);





}
