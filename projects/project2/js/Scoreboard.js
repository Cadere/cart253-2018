// Scoreboard
//
// A class that defines how a scoreboard acts
// Includes displaying the player score

// Scoreboard constructor
//
// Sets the properties with the provided arguments
function Scoreboard (x,y,size,name,paddle){
  this.x = x;
  this.y = y;
  this.size = size;
  this.name = name;
  this.paddle = paddle;
  this.score;
  this.xCenter = this.x + this.size/2;
  this.character;
  this.text;
}

//setup
//
//this tells the scoreboard which character to get information from
Scoreboard.prototype.setup = function(character){
  this.character = character;
}

//setText
//this sets the Scoreboard text to be appropriate for the game currently played
Scoreboard.prototype.setText = function(text){
  this.text = text;
}

//display
//
//this method displays the Scoreboard
Scoreboard.prototype.display = function() {
  push();
  fill(this.character.color);
  noStroke();
  rect(this.x,this.y,this.size,this.size);
  fill(255);
  textFont(agencyFB);
  textSize(14);
  textAlign (CENTER, CENTER);
  //this displays the player name at the bottom of the scoreboard
  text(this.name, this.xCenter, this.y + this.size*0.85);
  // this displays "have escaped from" right above the player's name
  text(this.text, this.xCenter, this.y + this.size*0.6);
  //
  textSize(24);
  // this displays a darker box behind the score
  // Inside a push() pop() so the new fill does not affect the next text
  push();
  fill(0,50);
  rectMode(CENTER);
  rect(this.xCenter, this.y + this.size*0.25, this.size*0.8, this.size*0.35);
  pop();
  // this displays the score at the top right of the scoreboard
  text(this.score, this.x + this.size*0.3, this.y + this.size*0.25);
  // this displays a ball next to the score
  imageMode(CENTER);
  image(sheep,this.x+this.size*0.7, this.y+this.size*0.25, ball.size, ball.size)
  pop();
}

//update
//
//this methods updates the scoreboard
Scoreboard.prototype.update = function() {
  this.score = this.paddle.score;
}
