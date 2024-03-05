import { Mover } from "./mover";
import p5 from "p5";

let moverA;
let moverB;

function setup() {
  createCanvas(400, 400);
  moverA = new Mover(100, 200, 2);
  moverB = new Mover(300, 200, 16);
}

function draw() {
  background(0);

  if (mouseIsPressed) {
    let wind = createVector(0.1, 0);
    moverA.applyForce(wind);
    moverB.applyForce(wind);
  }

  let gravity = createVector(0, 0.2);

  // results in the same force, since weight / mass = Force again. so for both objects, force = gravity * mass / mass;
  let weightA = p5.Vector.mult(gravity, moverA.mass);
  let weightB = p5.Vector.mult(gravity, moverB.mass);
  moverA.applyForce(weightA);
  moverB.applyForce(weightB);

  moverA.update();
  moverA.edges();
  moverA.show();

  moverB.update();
  moverB.edges();
  moverB.show();
}

// ----------------- P5JS hook-in -------------------
// make p5js recognize functions through window
window.setup = setup;
window.draw = draw;

new p5(() => void 0);
// --------------------------------------------------
