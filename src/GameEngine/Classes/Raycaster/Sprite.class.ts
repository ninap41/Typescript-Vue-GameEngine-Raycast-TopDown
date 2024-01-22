export class Sprite {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  hit: any;
  screenPosition: any;

  constructor(x = 0, y = 0, z = 0, w = 128, h = 128) {
    this.x = x;
    this.y = y;
    this.z = w;
    this.w = w;
    this.h = h;
    this.hit = false;
    this.screenPosition = null; // calculated screen position
  }
}
