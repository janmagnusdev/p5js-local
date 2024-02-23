import p5 from "p5";
import {Mover} from "./mover";

let movers = Array(50).fill(undefined);
let attractors = [];
let sun;


function setup() {
  createCanvas(800, 800);
  movers = movers.map(() => {
    const pos = p5.Vector.random2D();
    const vel = pos.copy();

    vel.setMag(random(10, 15));
    vel.rotate(PI / 2);

    pos.setMag(random(200, 300));

    pos.add(createVector(width / 2, height / 2));
    const mass = random(10, 15);
    let mover = new Mover(pos.x, pos.y, vel.x, vel.y, mass);

    return mover;
  });
  sun = new Mover(width / 2, height / 2, 0, 0, 500);
}

function draw() {
  background(0, 10);

  movers.forEach(mover => {
    sun.attract(mover)
    movers.forEach(other => {
      if (mover !== other) {
        mover.attract(other);
      }
    })
  })

  movers.forEach(mover => {
    mover.update();
    mover.show();
  })

  sun.show();
}

// ----------------- P5JS hook-in -------------------
// make p5js recognize functions through window
(window as any).setup = setup;
(window as any).draw = draw;


// let webpack hook into p5
new p5(() => void 0);
// --------------------------------------------------