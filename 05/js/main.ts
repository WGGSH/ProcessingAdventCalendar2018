/// <reference path="p5.global-mode.d.ts" />


const LIGHTNUM: number = 100; // 光球用画像の個数
const NUM: number = 2500; // 描画する光球の上限 増やすと重くなる
const NUM2: number = NUM * 0.35;

let light: p5.Image;
let lights: p5.Image[];
let vert: p5.Vector[]; // 光球の配置座標

// 各種パラメータ
let param1: number;
let param2: number;
let param3: number;
let param4: number;

let pDeviceOrientation: any;

const DETAIL: number = 6400; // 自作三角関数の細度
let mySin: number[];
let myCos: number[];

function sinSetup(): void {
  mySin = new Array(DETAIL);
  for (let i: number = 0; i < DETAIL; i++){
    mySin[i] = sin(PI * 2 / DETAIL * i);
  }
}

function cosSetup(): void {
  myCos = new Array(DETAIL);
  for (let i: number = 0; i < DETAIL; i++){
    myCos[i] = cos(PI * 2 / DETAIL * i);
  }
}

function MySin(radian: number): number{
  let degree = int((radian / (PI / 180) * (DETAIL / 360)) % DETAIL);
  if (degree < 0) {
    degree += DETAIL;
  }
  return mySin[degree];
}

function MyCos(radian: number): number {
  let degree = int((radian / (PI / 180) * (DETAIL / 360)) % DETAIL);
  if (degree < 0) {
    degree += DETAIL;
  }
  return myCos[degree];
}

function setup(): void {
  frameRate(30);

  createCanvas(windowWidth, windowHeight);

  background(0);
  light = createLight(0.5, 1.0, 0.2);

  lights = new Array(LIGHTNUM);
  for (let i: number = 0; i < LIGHTNUM; i++){
    lights[i] = createLight(1.0 / LIGHTNUM * i, 2.3, 0.09); // 適当にいじると色が変わる
  }

  vert = new Array(NUM);
  for (let i: number = 0; i < NUM; i++){
    vert[i] = new p5.Vector();
  }

  pDeviceOrientation = deviceOrientation;

  sinSetup();
  cosSetup();
}

// 光る球体の画像を生成する関数
// 参考: http://p5aholic.hatenablog.com/entry/2015/12/10/000000
function createLight(hue: number, saturation: number, bright: number): p5.Image {
  const side: number = 64; // 1辺の大きさ 大きくしすぎると重くなる
  const center: number = side / 2.0; // 中心座標

  // 画像を生成
  let img: p5.Image = createImage(side, side);
  img.loadPixels();

  colorMode(HSB,360,360,360,100);
  // 画像の一つ一つのピクセルの色を設定する
  for (let y:number = 0; y < side; y++) {
    for (let x:number = 0; x < side; x++) {
      let distance: number = (sq(center - x) + sq(center - y)) / 60.0;

      let h: number = int(360 * hue);
      let s: number = int(100 * saturation);
      let v: number = int(100 * bright) / distance;
      let a: number = 255;
      if (v <=5) {
        v=0
      }
      img.set(x, y, color(h,s,v,255));
    }
  }
  img.updatePixels();

  return img;
}

function draw(): void {
  if (pDeviceOrientation != undefined && pDeviceOrientation != deviceOrientation){
    // 向きが変わったとき
    noCanvas();
    createCanvas(window.innerWidth, windowHeight);
  }
  pDeviceOrientation = deviceOrientation;

  blendMode(BLEND);
  background(0,45);
  blendMode(ADD);

  fill(255);
  noStroke();

  param1 = rotationX/3;
  param2 = rotationY/3;
  param3 = abs(rotationZ-180);
  param4 = frameCount;
  // デバッグ用
  // text(param1, 0, 10);
  // text(param2, 0, 25);
  // text(param3, 0, 40);
  // text(param4, 0, 65);
  // text(frameRate(), 0, 80);

  // 画面の回転
  translate(width / 2, height / 2);
  rotate(param4/180);
  translate(-width / 2, -height / 2);


  // 座標の更新
  // 適当にいじると形が変わる
  for (let i: number = 0; i < NUM; i++) {
    vert[i].x = width / 2 + (180 - 150 / NUM * i) * MyCos(PI * 2 / NUM2 * i * (1 + (param1 - param3) / 100) * 2 * (1 + 0.3 * MySin(PI / 180 * param4)) + param1 / 10);
    vert[i].y = height / 2 + (180 - 150 / NUM * i) * MySin(PI * 2 / NUM2 * i * (1 + param2 / 100) * 2 * (1 + 0.3 * MySin(PI / 180 * param4)) + param1 / 10);
  }


  // 描画
  for (let i: number = 0; i < NUM; i++){
    push();
    translate(vert[i].x, vert[i].y);
    image(lights[int(74 + 25 * MySin(PI * 2 / NUM * i+param4/60))], -light.width / 2, -light.height / 2);
    pop();
  }
}

