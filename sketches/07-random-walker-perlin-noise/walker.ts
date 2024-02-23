import p5 from "p5";

export class Walker {
  private pos: p5.Vector;
  private vel: p5.Vector;

  constructor(x, y, vel = createVector(1, -1)) {
    this.pos = createVector(x, y);
    this.vel = vel;
  }

  update() {
    // this.vel = p5.Vector.random2D();
    // this.vel.mult(random(10));

    this.pos.add(this.vel);
  }

  show() {
    // stroke with two parameters is [grayscale, alpha] - both are 8bit, so a value of alpha = 100 is not 100% alhpa, but 100/255%
    stroke(0xff, 100);
    fill(0xff, 100);
    ellipse(this.pos.x, this.pos.y, 5);
  }
}

