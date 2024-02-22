import * as p5 from "p5";
let s = (sk) => {
  let layers = [];

  // sk.translate(window.innerWidth/2,window.innerHeight/2);
  sk.setup = () => {
    let gfx = sk.createGraphics(window.innerWidth, window.innerHeight);
    sk.createCanvas(window.innerWidth, window.innerHeight);

    gfx.ellipse(0, 0, 100, 100);
    sk.image(gfx, 0, 0);
    sk.rotate(1);
  };
};
const P5 = new p5(s);
