/// <reference path="p5.global-mode.d.ts" />

let pDeviceOrientation: any;

function setup(): void {
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });

  createCanvas(windowWidth, windowHeight);

  pDeviceOrientation = deviceOrientation;
}

function draw(): void {
  if (pDeviceOrientation !== undefined && pDeviceOrientation !== deviceOrientation) {
    // 向きが変わったとき
    noCanvas();
    createCanvas(window.innerWidth, windowHeight);
  }
  pDeviceOrientation = deviceOrientation;

  background(0);

  if (mouseIsPressed) {
    fill(255);
    ellipse(mouseX, mouseY, 50, 50);
  }
}
