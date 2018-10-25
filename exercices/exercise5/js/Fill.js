//fill
//
//A class to define how the fill behaves
//the fill color is modified at the same time as the score of the paddles
function Fill(red,green,blue,colorModifier){
  this.red = red;
  this.green = green;
  this.blue = blue;
  this.colorModifier = colorModifier;
}

//This makes the fill color more cyan
Fill.prototype.leftScored = function(){
  this.red = constrain(this.red - this.colorModifier, colorMinValue, colorMaxValue);
  this.blue = constrain(this.blue + this.colorModifier, colorMinValue, colorMaxValue);
}

//This makes the fill color more yellow
Fill.prototype.rightScored = function(){
  this.red = constrain(this.red + this.colorModifier, colorMinValue, colorMaxValue);
  this.blue = constrain(this.blue - this.colorModifier, colorMinValue, colorMaxValue);
}

//This makes the fill color greener
Fill.prototype.bgProgress = function(){
  this.green = constrain(this.green + this.colorModifier, colorMinValue, colorMaxValue);
}
