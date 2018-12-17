/// <reference path="p5.global-mode.d.ts" />

// http://neos21.hatenablog.com/entry/2017/10/13/080000

function setup() {

  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });

  // DeviceOrientation Event
  window.addEventListener("deviceorientation", deviceorientationHandler);



  createCanvas(windowWidth, windowHeight);
  
  background(0);
  colorMode(HSB, 360);
}

var val: number = 0;
let x: number = 0;
let y: number = 0;
let z: number = 0;

function draw() {
  // background(val % 255);
  background(0,5);
  val++;


  // translate(width / 2, height / 2);
  let vec: p5.Vector = new p5.Vector(x, y, z);
  vec.normalize();
  vec.mult(300);
  translate(windowWidth / 2, windowHeight / 2);
  translate((y ) / 90 * width, (x ) / 90 * height);

  noFill();
  stroke(z, 360, 360);
  ellipse(0, 0, 120, 120);
  // rotateY(-y / 180 * PI);
  // rotateX(x / 180 * PI);
  // rotateZ(z / 180 * PI);
  // box(150);
  // line(0, 0, 0, vec.x, vec.y, vec.z);
}

// ジャイロセンサーの値が変化
function deviceorientationHandler(event) {
  // X軸
  x = event.beta;
  // Y軸
  y = event.gamma;
  // Z軸
  z = event.alpha;
}
