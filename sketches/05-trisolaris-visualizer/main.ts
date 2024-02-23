import {Mover} from "./mover";

let planets = Array(12).fill(undefined);
let attractors = [];
let suns = [];
let message = false;
let center;

const stable = false;

// TODO: make the simulation way slower, but keep framerate up
// -> solved by reducing forces at play

function setup() {
  colorMode(HSL);

  createCanvas(800, 800);
  planets = planets.map((_, index) => {
    const pos = p5.Vector.random2D();
    const vel = rotationalVelInit(pos);

    pos.mult(random(200, 250));

    const mass = random(3);
    let mover = new Mover(
        pos,
        vel,
        mass,
        color(360 / index, 80, 80),
        0.1
    );
    mover.id = index + 1;

    return mover;
  });

  if (stable) {
    const sunPos1 = createVector(width / 2, height / 2);
    const vel1 = rotationalVelInit(sunPos1);
    suns[0] = new Mover(sunPos1, vel1, 500, color(25, 100, 70), 1);
  } else {
    const sunPos1 = createVector(0, -200);
    const vel1 = rotationalVelInit(sunPos1).div(3);
    suns[0] = new Mover(sunPos1, vel1, 500, color(25, 100, 70), 1);
    const sunPos2 = createVector(-100, 200);
    const vel2 = rotationalVelInit(sunPos2).div(3);
    suns[1] = new Mover(sunPos2, vel2, 500, color(53, 100, 46), 0.5);
    const sunPos3 = createVector(200, 100);
    const vel3 = rotationalVelInit(sunPos2).div(3);
    suns[2] = new Mover(sunPos3, vel3, 500, color(177, 100, 87), 1.2);
  }
  center = new Mover(createVector(0, 0), createVector(0, 0), 800, color(0, 0, 0), 1)
}

function rotationalVelInit(pos) {
  const vel = pos.copy();
  vel.rotate(PI / 2);
  vel.setMag(random(3, 5));
  return vel;
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  attraction();

  planets.forEach((planet) => {
    planet.update();
    planet.show();
    planet.edges();
  });
  suns.forEach((sun) => {
    sun.update();
    sun.show();
    sun.edges();
  });

  collision();
}

function attraction() {
  planets.forEach((planet) => {
    planets.forEach((other) => {
      if (planet !== other) {
        planet.attract(other);
      }
    });
  });

  suns.forEach((sun) => {
    suns.forEach((other) => {
      if (sun !== other) {
        sun.attract(other);
      }
    });
    planets.forEach((planet) => {
      sun.attract(planet);
    });
  });
}

function collision() {
  planets.forEach(planet => {
    suns.forEach(sun => {
      if (planets.length !== 1) {
        if (sun.collides(planet)) {
          console.log(`Planet ${planet.id} has been utterly destroyed!`);
          planets = planets.filter(toFilter => toFilter !== planet);
        }
      } else if (!message) {
        console.log(`The Trisolarians are living on Planet ${planets[0].id}!`);
        message = true;
      }
    })
  })
}

// ----------------- P5JS hook-in -------------------
// make p5js recognize functions through window
(window as any).setup = setup;
(window as any).draw = draw;


// let webpack hook into p5
import p5 from "p5";

new p5(() => void 0);
// --------------------------------------------------
