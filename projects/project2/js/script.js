// HERDER PONG
// by Eugene Fournier
//
// A reskin of Pong with paddles as "dogs" and the ball as a "sheep"
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
// with 2 game modes, a title page with menu, a game over page,
// as well as a character select screen
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var ball2;
var leftPaddle;
var rightPaddle;
///////// NEW ////////
//variables for the paddle size
var paddleWidth = 10;
var paddleHeight = 60;
//variables to contain the scoreboards
var leftScoreboard;
var rightScoreboard;
//variables to contain the Decoys
// var decoy;
var decoys = [];
var decoyNumber = 25;
//variables to contain the enclosures
var enclosure;
//variables for the menu
var stateArray;
var menu;

//variables for the character select menu
var leftCharacterSelect;
var rightCharacterSelect;
var rightMenuInfo = [];
var leftMenuInfo = [];

//variables for the images used in the game
//this one is for the Ball and Decoys
var sheep;
//these are for the paddles
var leftImage;
var rightImage;
//these are for the characters
var leftCharacter;
var rightCharacter;
// these are for the gameover screen
var leftLost;
var rightLost;
// these are for the second version of the gameOver screen
var leftWon;
var rightWon;
// this is for the logo on the title screen
var logo;
// a variable for the font I am using, since Macs do not have it by default
var agencyFB;

///////// END NEW ////////

/////// NEW //////
// this variable contains the score needed for the game to be over
var finishScore = 3;

// these variables are used for the appearance of the scoreboards
var edge = 15;
var scoreboardSize = 75;

///// NEW /////
// Taken from the spacelove game
// Tracking the current state of the program (title screen to begin)
var state = "TITLE";
/////// END NEW //////

//////// NEW ///////////
//preload()
//
//loads the images before the game starts
function preload(){
  agencyFB = loadFont("assets/fonts/Agency_FB.ttf");
  sheep = loadImage("assets/images/sheep.png");
  logo = loadImage("assets/images/logo.png");
  leftImage = [
    loadImage("assets/images/left1.png"),
    loadImage("assets/images/left2.png"),
    loadImage("assets/images/left3.png"),
    loadImage("assets/images/left4.png"),
    loadImage("assets/images/left5.png")
  ]
  rightImage = [
    loadImage("assets/images/right1.png"),
    loadImage("assets/images/right2.png"),
    loadImage("assets/images/right3.png"),
    loadImage("assets/images/right4.png"),
    loadImage("assets/images/right5.png")
  ]
  leftLost = [
    loadImage("assets/images/leftlost1.png"),
    loadImage("assets/images/leftlost2.png"),
    loadImage("assets/images/leftlost3.png"),
    loadImage("assets/images/leftlost4.png"),
    loadImage("assets/images/leftlost5.png")
  ]
  rightLost = [
    loadImage("assets/images/rightlost1.png"),
    loadImage("assets/images/rightlost2.png"),
    loadImage("assets/images/rightlost3.png"),
    loadImage("assets/images/rightlost4.png"),
    loadImage("assets/images/rightlost5.png")
  ]
  leftWon = [
    loadImage("assets/images/leftwon1.png"),
    loadImage("assets/images/leftwon2.png"),
    loadImage("assets/images/leftwon3.png"),
    loadImage("assets/images/leftwon4.png"),
    loadImage("assets/images/leftwon5.png")
  ]
  rightWon = [
    loadImage("assets/images/rightwon1.png"),
    loadImage("assets/images/rightwon2.png"),
    loadImage("assets/images/rightwon3.png"),
    loadImage("assets/images/rightwon4.png"),
    loadImage("assets/images/rightwon5.png")
  ]
}

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  //variable for the character colors
  var leftColor = [
    color("#0F6939"),
    color("#a7ae38"),
    color("#55ba48"),
    color("#8fc987"),
    color("#eac319")
  ]
  var rightColor = [
    color("#218464"),
    color("#696c35"),
    color("#55ba48"),
    color("#94cf9a"),
    color("#c1c930")
  ]
  // Create a ball
  ball = new Ball(width/2,height/2,20,5);
  // create ball2
  ball2 = new Ball2(width/2, 0, 20, 5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,paddleWidth,paddleHeight,10,DOWN_ARROW,UP_ARROW,LEFT_ARROW,RIGHT_ARROW);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,paddleWidth,paddleHeight,10,83,87,65,68);
  //sets the starting velocity of the ball object we just created
  //////////// NEW ////////////
  //create left Scoreboard
  leftScoreboard = new Scoreboard (edge,edge,scoreboardSize,"LEFT",leftPaddle);
  // this variable is used for the position of the rightScoreboard's left corner
  var rightCorner = width - (edge + scoreboardSize);
  // create right Scoreboard
  rightScoreboard = new Scoreboard (rightCorner,edge,scoreboardSize, "RIGHT", rightPaddle);
  // create multiple Decoys
  for (var i = 0; i < decoyNumber; i++){
    decoys.push(new Decoy(random(-150,150), random(-150.150), 0, random(-1,1), random(0.05,0.5)));
  }
  // // setup the multiple Decoys
  for (var i = 0; i < decoyNumber; i++){
    decoys[i].setup();
  }
  //setup the enclosure
  enclosure = new Enclosure(width/2, height-edge/2, 200, edge, "#6f9351");
  //create the main menu
  menu = new Menu(3,UP_ARROW,DOWN_ARROW);
  //creates the left paddle character select menu
  leftCharacterSelect = new HorizontalMenu(160,5,65,68,87,"Move with\nA and D,\nuse W to select");
  //creates the right paddle character select menu
  rightCharacterSelect = new HorizontalMenu(340,5,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,"Move with\nLEFT and RIGHT,\nuse UP to select");
  //create an array of menu states for the main menu
  stateArray = [
    //state 0 has undefined as a second argument so no rectangle appears
    // it has title as a 3rd argument so if the spacebar is clicked and no
    //menu option is selected, the state remains title
    new MenuInfo(0,undefined,"TITLE"),
    new MenuInfo(1,menu.edge+menu.size/menu.choiceNumber,"GAME 1"),
    new MenuInfo(2,menu.edge+menu.size/menu.choiceNumber*2,"GAME 2"),
    new MenuInfo(3,menu.edge+menu.size/menu.choiceNumber*3, "CHARACTER SELECT")
  ]
  //abbreviate some numbers used by the next array with ugly variable names
  var lcse = leftCharacterSelect.edge;
  var lcs = leftCharacterSelect.size/(leftCharacterSelect.choiceNumber);
  //create an array of menu states for the left character select menu
  for (var i = 0; i < leftCharacterSelect.choiceNumber; i++){
    leftMenuInfo.push(new MenuInfo(i+1,lcse+lcs*i,"game",leftImage[i]));
  }
  // create an array of meny states for the right character select menu
   var rcse = rightCharacterSelect.edge;
   var rcs = rightCharacterSelect.size/(rightCharacterSelect.choiceNumber);
   for (var i = 0; i < rightCharacterSelect.choiceNumber; i++){
     rightMenuInfo.push(new MenuInfo(i+1,rcse+rcs*i,"game",rightImage[i]));
  }
  //create the character objects
  rightCharacter = new Character(rightCharacterSelect,rightImage,rightColor,rightLost,rightWon);
  leftCharacter = new Character(leftCharacterSelect,leftImage,leftColor,leftLost,leftWon);
  //this sets the initial velocity for the balls
  ball.setup();
  ball2.setup();
  //this tell the HorizontalMenu object which array to take its information from
  leftCharacterSelect.setup(leftMenuInfo);
  rightCharacterSelect.setup(rightMenuInfo);
  //this tells the paddle which character to get information from
  rightPaddle.setup(rightCharacter);
  leftPaddle.setup(leftCharacter);
  //this tells the scoreboards which character to get information from
  rightScoreboard.setup(rightCharacter);
  leftScoreboard.setup(leftCharacter);
  ///////// END NEW ///////////
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background("#a8c089");

  ////// NEW //////////
  // the switch statement checks the state of the game
  // and displays the proper screen
  switch (state) {
    case "TITLE":
    displayTitle();
    break;

    case "GAME 1":
    displayGame1();
    break;

    case "GAME 2":
    displayGame2();
    break;

    case "CHARACTER SELECT":
    displayCharacterSelect();
    break;

    case "GAME LOST":
    displayGameLost();
    break;

    case "GAME WON":
    displayGameWon();
    break;
  }
}

/////// NEW ///////
// displayTitle()
//
//This function displays the intro title and controls
function displayTitle() {
  //handle imput for the menu to respond
  menu.handleInput();
  // Set up all the styling elements
  push();
  textAlign(CENTER,CENTER);
  textFont(agencyFB);
  textSize(32);
  fill(255);
  noStroke();
  // // Display the text
  // text("HERDER PONG",width/2,height/5);
  push()
  translate(width/2,height*0.25);
  scale(0.75,0.75);
  imageMode(CENTER);
  image(logo,50,0);
  pop();
  // Font size goes down
  textSize(16);
  // Display the instructions
  text("Press SPACE to play\nLeft player use WASD and Right player use ARROWS",width/2,0.9*height);
  pop();

  //display menu
  menu.display();
  // Check whether the spacebar was pressed to start the game...
  if (keyIsPressed && key === ' ') {
    // if it was, change the state to the appropriate item in the menu
    state = stateArray[menu.state].gameState;
    console.log(state);
  }
}

// displayGame1()
//
// This function displays the actual game
function displayGame1() {
  leftScoreboard.setText("escaped from");
  rightScoreboard.setText("escaped from");
  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();
  /////// NEW ////////
  // scoreboard updates its score
  leftScoreboard.update();
  rightScoreboard.update();
  //decoys update their angles
  for (var i = 0; i < decoyNumber; i++){
    decoys[i].update();
  }
  // decoy.update();
  // ball.isOffScreen now recognizes which side of the screen the ball went off to
  // The paddle's scores update accordingly
  if (ball.isOffScreen() === "left") {
    ball.reset()
    leftPaddle.updateScore();
  }
  else if (ball.isOffScreen() === "right"){
    ball.reset()
    rightPaddle.updateScore();
  }

  /////// END NEW ////////

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ///////// NEW ////////
  //display scoreboards
  leftScoreboard.display();
  rightScoreboard.display();
  //display decoys
  for (var i = 0; i < decoyNumber; i++){
    decoys[i].display();
  }


  //////// END NEW ////////
  ball.display();
  leftPaddle.display();
  rightPaddle.display();
  /////// NEW //////
  // if either player reaches 11 points they lose
  // this means the game is over - this checks if the game is over
  // and changes the state accordingly
  if (gameOver()) {
    state = "GAME LOST";
  }
}

// displayGame2()
//
// This function displays the actual game
function displayGame2() {
  leftScoreboard.setText("penned by");
  rightScoreboard.setText("penned by");
  leftPaddle.handleInput();
  rightPaddle.handleInput();
  leftPaddle.handleBark();
  rightPaddle.handleBark();

  ball2.update();
  leftPaddle.update();
  rightPaddle.update();
  /////// NEW ////////
  // scoreboard updates its score
  leftScoreboard.update();
  rightScoreboard.update();

  /////// END NEW ////////

  ball2.handleCollision(leftPaddle);
  ball2.handleCollision(rightPaddle);

  ///////// NEW ////////

  // handleCollision with the enclosure
  if (ball2.enclosureCollision(enclosure)){
    ball2.reset();
    if(ball2.lastPaddle === leftPaddle){
      leftPaddle.updateScore();
    }
    if(ball2.lastPaddle === rightPaddle){
      rightPaddle.updateScore();
    }
    enclosure.updateScore();
  }
  //display scoreboards
  leftScoreboard.display();
  rightScoreboard.display();

  //display enclosure
  enclosure.display();

  //////// END NEW ////////
  ball2.display();
  leftPaddle.display();
  rightPaddle.display();
  /////// NEW //////
  // this displays the bark text
  leftPaddle.displayBark(20);
  rightPaddle.displayBark(-20);
  // if either player reaches 11 points they lose
  // this means the game is over - this checks if the game is over
  // and changes the state accordingly
  if (gameOver()) {
    state = "GAME WON";
  }
}

///////// NEW /////////
//displayCharacterSelect()
//
//displays a menu in which players can pick their characters
function displayCharacterSelect() {
  // Set up all the styling elements
  push();
  textAlign(CENTER,CENTER);
  textFont(agencyFB);
  textSize(32);
  fill(255);
  noStroke();
  // Display the text
  text("CHARACTER SELECTION",width/2,height/10);
  textSize(16);
  // Display the instructions
  text("Press ENTER to return to title screen",width/2,0.92*height);
  pop();
  leftCharacterSelect.handleInput();
  leftCharacterSelect.display();
  rightCharacterSelect.handleInput();
  rightCharacterSelect.display();
  if(keyIsDown(leftCharacterSelect.confirmKey)){
  leftCharacter.characterPicked();
  }
  if(keyIsDown(rightCharacterSelect.confirmKey)){
  rightCharacter.characterPicked();
  }
  console.log(rightCharacter.state)
  if (keyIsDown(ENTER)) {
    // ... if it was, change the state to "TITLE" so the switch statement in draw()
    // will display the title instead
    state = "TITLE";
    leftPaddle.resetScore();
    rightPaddle.resetScore();
  }
}

// displayGameLost()
//
// Displays game over text
function displayGameLost() {
  push();
  imageMode(CENTER);
  textAlign(CENTER,CENTER);
  textFont(agencyFB);
  textSize(36);
  fill(255);
  stroke(255);
  // this text indicates which player lost
  if (leftPaddle.score > rightPaddle.score){
    text("LEFT PLAYER LOST",width*0.25,height*0.7);
    push();
    translate(width/2,height/2);
    scale(0.75,0.75);
    image(leftCharacter.lost,0,0);
    pop();
    textSize(24);
    text("PRESS ENTER TO RETURN TO TITLE", width*0.65, height*0.85);
  }
  else {
    text("RIGHT PLAYER LOST", width*0.75, height*0.7);
    push();
    translate(width/2,height/2);
    scale(0.75,0.75);
    image(rightCharacter.lost,0,0);
    pop();
    textSize(24);
    text("PRESS ENTER TO RETURN TO TITLE", width*0.35, height*0.85);
  }
  pop();
  // Check whether the spacebar was pressed to restart the game
  if (keyIsDown(ENTER)) {
    // ... if it was, change the state to "TITLE" so the switch statement in draw()
    // will display the title instead
    state = "TITLE";
    leftPaddle.resetScore();
    rightPaddle.resetScore();
  }
}

// displayGameWon()
//
// Displays game over text
function displayGameWon() {
  push();
  imageMode(CENTER);
  textAlign(CENTER,CENTER);
  textFont(agencyFB);
  textSize(36);
  fill(255);
  stroke(255);
  // this text indicates which player lost
  if (leftPaddle.score > rightPaddle.score){
    text("LEFT PLAYER WON!",width*0.4,height*0.35);
    push();
    translate(width/2,height/2);
    scale(0.75,0.75);
    image(leftCharacter.won,0,0);
    pop();
    textSize(24);
    text("PRESS ENTER TO RETURN TO TITLE", width*0.65, height*0.9);
  }
  else {
    text("RIGHT PLAYER WON!", width*0.6, height*0.35);
    push();
    translate(width/2,height/2);
    scale(0.75,0.75);
    image(rightCharacter.won,0,0);
    pop();
    textSize(24);
    text("PRESS ENTER TO RETURN TO TITLE", width*0.35, height*0.9);
  }
  pop();
  // Check whether the spacebar was pressed to restart the game
  if (keyIsDown(ENTER)) {
    // ... if it was, change the state to "TITLE" so the switch statement in draw()
    // will display the title instead
    state = "TITLE";
    leftPaddle.resetScore();
    rightPaddle.resetScore();
  }
}
/////// END NEW //////

/////// NEW ///////
//randomNegative()
//
//this spits a value or its negative at random
function randomNegative(value) {
  var r = random();
  var result;
  if (r < 0.5){
    result = value;
  }
  else {
    result = -value;
  }
  return result;
}

// this spits a value or its double at random
function randomDouble(value) {
  var r = random();
  var result;
  if (r < 0.5){
    result = value;
  }
  else {
    result = 2*value;
  }
  return result;
}

//gameOVer
//
// this function checks if the game has been lost by one of the players
function gameOver() {
  if (leftPaddle.score === finishScore || rightPaddle.score === finishScore){
    return true;
  }
  else {
    return false;
  }
}

function keyPressed(){
    menu.keyPressed();
    leftCharacterSelect.keyPressed();
    rightCharacterSelect.keyPressed();
}
