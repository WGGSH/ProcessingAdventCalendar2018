/// <reference path="p5.global-mode.d.ts" />
var gyro; // ジャイロセンサの値を格納する
function setup() {
    gyro = new p5.Vector();
    // ジャイロセンサの値を取得するコールバック
    window.addEventListener("deviceorientation", function (event) {
        gyro.x = event.beta;
        gyro.y = event.gamma;
        gyro.z = event.alpha;
    });
    createCanvas(windowWidth, windowHeight);
    background(0);
    colorMode(HSB, 360, 100, 100, 100);
}
function draw() {
    blendMode(BLEND);
    background(0, 5);
    blendMode(ADD);
    translate(windowWidth / 2, windowHeight / 2);
    noFill();
    stroke(gyro.z, 85, 10);
    strokeWeight(3);
    var startPos = new p5.Vector(0, 0);
    var endPos = new p5.Vector(gyro.y / 90 * width, -gyro.x / 90 * height);
    for (var i = 0; i < 25; i++) {
        var startRandVec = p5.Vector.random2D().mult(random(0, 10));
        var endRandVec = p5.Vector.random2D().mult(random(0, 10));
        line(startPos.x + startRandVec.x, startPos.y + startRandVec.y, endPos.x + endRandVec.x, endPos.y + endRandVec.y);
    }
}
//# sourceMappingURL=main.js.map