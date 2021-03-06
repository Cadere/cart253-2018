//Card
//
// a class that holds information for a card
//
//Card constructor
function Card(image,value){
  //value will be used in a future version to match cards
  this.value = value;
  this.image = image;
  this.position;
  this.turned = false;
  this.found = false;
}

//givePosition()
//
// gives the Card it's position object
Card.prototype.givePosition = function(position){
  this.position = position;
}

//display()
//
//this method displays the card image at the proper location
Card.prototype.display = function(){
  push();
  imageMode(CENTER);
  //this displays the back image if the card hasn't been clicked
  if(!this.turned){
    image(cardBack,this.position.x,this.position.y,cardSize,cardSize);
  }
  //and the front image if the card  has been clicked
  else{
    image(this.image,this.position.x,this.position.y,cardSize,cardSize);
  }
  pop();
}

//turnCard();
//
//this method turns the card that has been clicked
Card.prototype.turnCard = function(){
  this.turned = true;
}

//clickedValue();
//
//this method sets the variable lastCardValue to the value of the last card clicked
Card.prototype.clickedValue = function(){
  if(mouseX > this.position.x-cardSize/2 && mouseX < this.position.x+cardSize/2){
    if(mouseY > this.position.y-cardSize/2 && mouseY < this.position.y+cardSize/2 ){
      lastCardValue = this.value;
      this.extractCoordinates();
      return true;
    }
  }
  return false;
}

//foundStatus();
//
//changes this.found from false to true - this will prevent the card from getting flipped again
// when other cards are reset
Card.prototype.foundStatus = function(){
  this.found = true;
}

//reset();
//
//this method resets this.turned to false if the card hasn't been found
Card.prototype.reset = function(){
  if(!this.found){
      this.turned = false;
  }
}

//extractCoordinates();
//
//this extracts the card's x and y coordinates and creates a vector with them
Card.prototype.extractCoordinates = function(){
  coordinates.push(createVector(this.position.x,this.position.y))
}

//newGame();
//
//resets the cards to unturned and unfound
Card.prototype.newGame = function(){
  this.found = false;
  this.turned = false;
}
