import {Walker} from "./walker";

let walkers;
let inc = 0.01;
let start = 0;
let timer = 0;
let xoff = start;
let yoff = start + 100;
let walker;

// create an array of n walkers going into one direction since their creation
// their origin stays the same
// update all current walkers consecutively
// draw all current walkers consecutively
// create new walkers, clear the ones that have gone off the screen

function setup() {
  createCanvas(400, 400);
  background(0);

  // create 10 initial random walkers
  walkers = Array.from(Array(10)).map(() => {
    return newNoiseWalker();
  });

  walker = new Walker(200, 200);
}

function newNoiseWalker() {
  let x = noise(xoff);
  let y = noise(yoff);
  x = map(x, 0, 1, -3, 3);
  y = map(y, 0, 1, -3, 3);
  xoff += inc;
  yoff += inc;

  return new Walker(200, 200, createVector(x, y));
}


function draw() {
  background(0);
  walkers.push(newNoiseWalker());
  walkers.forEach((walker) => {
    walker.update();
    walker.show();
  })
  // filter out walkers that are not in the canvas
  walkers = walkers.filter(element => {
    return !(element.pos.x < 0 || element.pos.x > width || element.pos.y < 0 || element.pos.y > height);
  })

  let fps = Math.round(frameRate() * 100) / 100;
  text(fps, 50, 50);
}

// ----------------- P5JS hook-in -------------------
// make p5js recognize functions through window
(window as any).setup = setup;
(window as any).draw = draw;


// let webpack hook into p5
import p5 from "p5";

new p5(() => void 0);
// --------------------------------------------------



