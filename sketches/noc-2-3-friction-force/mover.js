import p5 from "p5";

export class Mover {
  constructor(x, y, mass) {
    this.pos = createVector(x, y);

    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.r = sqrt(this.mass) * 10;
  }

  update() {
    // let mouse = createVector(mouseX, mouseY);
    // this.acc = p5.Vector.sub(mouse, this.pos);
    // this.acc.setMag(1);

    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // clear acceleration at the end of every time step since eulers integration makes acc not cumulative, while vel and pos are
    this.acc = createVector(0, 0);
  }

  edges() {
    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }

    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }

  applyForce(force) {
    // newtons law: A = F / M
    const f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
