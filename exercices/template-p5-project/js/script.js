/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

var x;
var y;
var tx;
var ty;
function setup() {
  createCanvas(500,500);
  tx = random(0,1000);
  ty = random(0,1000);
}
function draw() {
  background(255);
  x = width * noise(tx);
  y = height * noise(ty);
  tx += 0.01;
  ty += 0.01;
  ellipse(x,y,10,10);
}
