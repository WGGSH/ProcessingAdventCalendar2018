/// <reference path="p5.global-mode.d.ts" />


let pDeviceOrientation: any;

// タッチした情報を格納するクラス
class touchObject{
  private touch: object;
  private id: number;
  private count: number;
  constructor(_touch: object) {
    this.touch = _touch;
    this.id = _touch.id;
    this.count = 0;
  }

  public update(): boolean{
    this.count++;

    // 削除判定
    // 同じIDのtouchが存在しなければ削除
    let isExist: boolean=false;
    touches.forEach(element => {
      if (element.id === this.id) {
        this.touch = element;
        isExist = true;
      }
    });

    this.draw();


    return isExist;
  }

  private draw(): void{
    noFill();
    stroke(abs(this.id * 73) % 360, 70, 10);
    strokeWeight(this.count/2);
    ellipse(this.touch.x, this.touch.y, this.count*this.count/20, this.count*this.count/20);
  }
}

let touchObjectList: touchObject[];

function setup(): void {
  createCanvas(windowWidth, windowHeight);

  background(0);
  colorMode(HSB, 360, 100, 100, 100);

  touchObjectList = new Array();

  pDeviceOrientation = deviceOrientation;
}

function draw(): void {
  if (pDeviceOrientation !== undefined && pDeviceOrientation !== deviceOrientation) {
    // 向きが変わったとき
    noCanvas();
    createCanvas(window.innerWidth, windowHeight);
  }
  pDeviceOrientation = deviceOrientation;

  blendMode(BLEND);
  background(0,2);
  blendMode(ADD);
  stroke(255);
  if (touches.length != 0) {

    // 初出現のIDを探す
    touches.forEach(element => {
      console.log(element);
      let isExist: boolean = false;
      touchObjectList.forEach(object => {
        if (element.id === object.id) {
          isExist = true;
        }
      });
      if (isExist === false) {
        // 要素の追加
        touchObjectList.push(new touchObject(element));
      }
    });
  }


  touchObjectList.forEach(element => {
    if (element.update() === false) {
      touchObjectList.pop(element);
    }
  });

}
