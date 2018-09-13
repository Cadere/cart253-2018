/*****************

spiritual self portrait
eugene n fournier
06/09/2018

minimalist replica of my github avatar
using p5's set of shapes

******************/

// setup ()
//
// Replicates my github avatar with a series of shapes

function setup() {
  //teal background
createCanvas (500,500);
background ("#56bfa3");
//salmon oval and quad - the head and neck
noStroke();
fill("#ffc1af");
ellipse(275,250,450,400);
quad(180,300,500,250,500,500,225,500)
//pale patch on the neck
fill(200,240,215,180);
ellipse(250,400,310);
//teal quad - hides part of the salmon oval to give the jaw shape
fill("#56bfa3");
quad(0,325,180,300,225,500,0,500);
//teal patch on the shoulder
fill(143,214,195,180);
ellipse(500,500,400);
//brighter pink cheek patch
fill("#ffab93");
quad(60,317,200,225,300,250,180,300);
//white eye patch
fill(256,240,230);
triangle(100,200,175,90,275,120);
//eye
stroke("#56bfa3");
strokeWeight(4);
fill("#c7fc8f");
ellipse(180,130,45);
//pupil
line(175,140,175,120);
//nostril
stroke("#c94f34");
line(80,250,75,255);
}


// draw()
//
// Description of draw()

function draw() {

}
