import p5 from "p5";

const G = 1;

export class Mover {
  public id: number | undefined;
  private pos: any;
  private vel: any;
  private acc: p5.Vector;
  private mass: any;
  private density: any;
  private area: number;
  private r: number;
  private color: any;


  constructor(pos, vel, m, color, density) {
    this.id = undefined;
    this.pos = pos;

    this.vel = vel;
    this.acc = createVector(0, 0);
    this.mass = m;

    this.density = density;

    this.area = this.mass / density;

    this.r = sqrt(this.area / PI);

    this.color = color;
  }

  setInitialAcc(acc) {
    this.acc = acc;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // clear acceleration at the end of every time step since eulers integration makes acc not cumulative, while vel and pos are
    this.acc = createVector(0, 0);
  }

  edges() {
    // translated
    if (this.pos.y >= (height / 2) - this.r) {
      this.pos.y = (height / 2) - this.r;
      this.vel.y *= -1;
    } else if (this.pos.y <= -(height / 2) + this.r) {
      this.pos.y = -(height / 2) + this.r;
      this.vel.y *= -1;
    }

    if (this.pos.x >= (width / 2) - this.r) {
      this.pos.x = (width / 2) - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= -(width / 2) + this.r) {
      this.pos.x = -(width / 2) + this.r;
      this.vel.x *= -1;
    }
  }

  collides(mover) {
    const distanceVector = p5.Vector.sub(this.pos, mover.pos);
    let distance = distanceVector.mag();
    let radiiSum = this.r + mover.r;
    return distance <= radiiSum;
  }

  applyForce(force) {
    // newtons law: A = F / M
    const f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  attract(mover) {
    // Gravitational Attraction
    // F = ((m1* m2) / dist^2) * G * dirVector
    // magnitude of distance vector

    let r = p5.Vector.sub(this.pos, mover.pos);
    let rSq = constrain(r.magSq(), 1000, 3000);

    // constrain distance squared, so rSq, so that it is not too weak (when they are far apart) and not too strong (when they are very close)

    let strength = G * ((this.mass * mover.mass) / rSq);

    r.setMag(strength);

    mover.applyForce(r);
  }

  show() {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}