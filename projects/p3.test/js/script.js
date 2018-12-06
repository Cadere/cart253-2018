var defs;
var of;

function setup() {
    createCanvas(400, 400);
    var u = {
      name: "test",
      size: [8,12],
      sizePercent: [0.99],
      angle: [0,360],
      acceleration: [0],
      speed: [2],
      lifetime: [75],
      color: ["#eeefc0","#d5dd98","#f6dcd5","#f3b8ac"],
      rate: [300,150],
      limit: [30],
      dxy: [0,0],
      x: [0.5],
      y: [0.5]
    };

    of = new Fountain(null, u);
}

function draw() {
  background(51);
  of.Draw();
  of.Create();
  of.Step();
  noStroke();
  text(of.length, width/2, 20);
  stroke(0);
}
