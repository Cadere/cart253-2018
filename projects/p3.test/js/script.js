var defs;
var of;

function setup() {
    createCanvas(400, 400);
    var u = {
      name: "test",
      size: [16,22],
      sizePercent: [0.99],
      angle: [80,100],
      speed: [1],
      lifetime: [75],
      color: ["#7e7ebf","#b9baff","#a8a8ff", "#99d5c7"],
      rate: [300,150],
      limit: [30],
      dxy: [0.1,0.1],
      x: [0.5],
      y: [0.5]
    };

    of = new Fountain(null, u);
}

function draw() {
  background("#61a08e");
  of.Draw();
  of.Create();
  of.Step();
  noStroke();
  text(of.length, width/2, 20);
  stroke(0);
}
