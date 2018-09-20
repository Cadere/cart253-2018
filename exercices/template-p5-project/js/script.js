/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

function preload() {
}


var typedText = "";
var mouseX;
var mouseY;
var redness;
var greeness;
var blueness;

function setup() {
  createCanvas(500,500);
  textSize(24);
  textAlign(CENTER,CENTER);

}

function draw() {
  redness = 200 + mouseY/10
  greeness = 200 + mouseX/10
  blueness = 256 - (mouseX+mouseY)/20
  background (redness,greeness,blueness)
  text(typedText,width/2,height/2);
}

function keyTyped() {
  typedText += key;
}
