let x;
let y;

function setup() {
  createCanvas(640, 360);
  x = width / 2;
  y = height / 2;
  background(51);
}

function draw() {
  fill(255, 0, 200, 25);
  noStroke();
  ellipse(x, y, 48, 48);

  x = x + random(-15, 15);
  y = y + random(-15, 15);
}


// ----------------- P5JS hook-in -------------------
// make p5js recognize functions through window
(window as any).setup = setup;
(window as any).draw = draw;


// let webpack hook into p5
import p5 from "p5";

new p5(() => void 0);
// --------------------------------------------------



