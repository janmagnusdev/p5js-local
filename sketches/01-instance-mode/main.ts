import p5 from "p5";

let x;
let y;

const s = (s: p5) => {
  s.setup = () => {
    s.createCanvas(640, 360);

    x = s.width / 2;
    y = s.height / 2;
    s.background(51);
  }

  s.draw = () => {
    s.fill(255, 0, 200, 25);
    s.noStroke();
    s.ellipse(x, y, 48, 48);

    x = x + s.random(-15, 15);
    y = y + s.random(-15, 15);
  }
}

let myp5 = new p5(s);



