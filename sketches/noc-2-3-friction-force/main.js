import { Mover } from "./mover";
import p5 from "p5";

const movers = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    movers[i] = new Mover(random(width), height - 100, random(1, 8));
  }
}

function draw() {
  background(0);

  // forces
  for (let mover of movers) {
    if (mouseIsPressed) {
      let wind = createVector(0.1, 0);
      mover.applyForce(wind);
    }
    let gravity = createVector(0, 0.2);
    // results in the same force, since weight / mass = Force again. so for both objects, force = gravity * mass / mass;
    let weight = p5.Vector.mult(gravity, mover.mass);
    mover.applyForce(weight);

    mover.friction();

    // update show logic
    mover.update();
    mover.edges();
    mover.show();
  }

  // TODO: Draw the various vectors from the position of the movers
}

// ----------------- P5JS hook-in -------------------
// make p5js recognize functions through window
window.setup = setup;
window.draw = draw;

new p5(() => void 0);
// --------------------------------------------------
