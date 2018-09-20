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

function setup() {
  createCanvas(500,500);
  textSize(24);
  textAlign(CENTER,CENTER);
}

function draw() {
  if (keyIsPressed) {
    background (255,255,255,30)
  }
  text(typedText,width/2,height/2);
}

function keyTyped() {
  typedText += key;
}
