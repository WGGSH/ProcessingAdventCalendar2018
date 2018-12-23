/// <reference path="p5.global-mode.d.ts" />
var LIGHTNUM = 100; // 光球用画像の個数
var NUM = 2500; // 描画する光球の上限 増やすと重くなる
var NUM2 = NUM * 0.35;
var light;
var lights;
var vert; // 光球の配置座標
// 各種パラメータ
var param1;
var param2;
var param3;
var param4;
var pDeviceOrientation;
var DETAIL = 6400; // 自作三角関数の細度
var mySin;
var myCos;
function sinSetup() {
    mySin = new Array(DETAIL);
    for (var i = 0; i < DETAIL; i++) {
        mySin[i] = sin(PI * 2 / DETAIL * i);
    }
}
function cosSetup() {
    myCos = new Array(DETAIL);
    for (var i = 0; i < DETAIL; i++) {
        myCos[i] = cos(PI * 2 / DETAIL * i);
    }
}
function MySin(radian) {
    var degree = int((radian / (PI / 180) * (DETAIL / 360)) % DETAIL);
    if (degree < 0) {
        degree += DETAIL;
    }
    return mySin[degree];
}
function MyCos(radian) {
    var degree = int((radian / (PI / 180) * (DETAIL / 360)) % DETAIL);
    if (degree < 0) {
        degree += DETAIL;
    }
    return myCos[degree];
}
function setup() {
    frameRate(30);
    createCanvas(windowWidth, windowHeight);
    background(0);
    light = createLight(0.5, 1.0, 0.2);
    lights = new Array(LIGHTNUM);
    for (var i = 0; i < LIGHTNUM; i++) {
        lights[i] = createLight(1.0 / LIGHTNUM * i, 2.3, 0.09); // 適当にいじると色が変わる
    }
    vert = new Array(NUM);
    for (var i = 0; i < NUM; i++) {
        vert[i] = new p5.Vector();
    }
    pDeviceOrientation = deviceOrientation;
    sinSetup();
    cosSetup();
}
// 光る球体の画像を生成する関数
// 参考: http://p5aholic.hatenablog.com/entry/2015/12/10/000000
function createLight(hue, saturation, bright) {
    var side = 64; // 1辺の大きさ 大きくしすぎると重くなる
    var center = side / 2.0; // 中心座標
    // 画像を生成
    var img = createImage(side, side);
    img.loadPixels();
    colorMode(HSB, 360, 360, 360, 100);
    // 画像の一つ一つのピクセルの色を設定する
    for (var y = 0; y < side; y++) {
        for (var x = 0; x < side; x++) {
            var distance = (sq(center - x) + sq(center - y)) / 60.0;
            var h = int(360 * hue);
            var s = int(100 * saturation);
            var v = int(100 * bright) / distance;
            var a = 255;
            if (v <= 5) {
                v = 0;
            }
            img.set(x, y, color(h, s, v, 255));
        }
    }
    img.updatePixels();
    return img;
}
function draw() {
    if (pDeviceOrientation != undefined && pDeviceOrientation != deviceOrientation) {
        // 向きが変わったとき
        noCanvas();
        createCanvas(window.innerWidth, windowHeight);
    }
    pDeviceOrientation = deviceOrientation;
    blendMode(BLEND);
    background(0, 45);
    blendMode(ADD);
    fill(255);
    noStroke();
    param1 = rotationX / 3;
    param2 = rotationY / 3;
    param3 = abs(rotationZ - 180);
    param4 = frameCount;
    // デバッグ用
    // text(param1, 0, 10);
    // text(param2, 0, 25);
    // text(param3, 0, 40);
    // text(param4, 0, 65);
    // text(frameRate(), 0, 80);
    // 画面の回転
    translate(width / 2, height / 2);
    rotate(param4 / 180);
    translate(-width / 2, -height / 2);
    // 座標の更新
    // 適当にいじると形が変わる
    for (var i = 0; i < NUM; i++) {
        vert[i].x = width / 2 + (180 - 150 / NUM * i) * MyCos(PI * 2 / NUM2 * i * (1 + (param1 - param3) / 100) * 2 * (1 + 0.3 * MySin(PI / 180 * param4)) + param1 / 10);
        vert[i].y = height / 2 + (180 - 150 / NUM * i) * MySin(PI * 2 / NUM2 * i * (1 + param2 / 100) * 2 * (1 + 0.3 * MySin(PI / 180 * param4)) + param1 / 10);
    }
    // 描画
    for (var i = 0; i < NUM; i++) {
        push();
        translate(vert[i].x, vert[i].y);
        image(lights[int(74 + 25 * MySin(PI * 2 / NUM * i + param4 / 60))], -light.width / 2, -light.height / 2);
        pop();
    }
}
//# sourceMappingURL=main.js.map