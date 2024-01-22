export class RayState {
  rayAngle: any;
  strip: any;
  cellX: any;
  cellY: any;
  rayHits: any;
  vx: any;
  vy: any;
  hx: any;
  hy: any;
  vertical: any;
  horizontal: any;
  constructor(rayAngle: any, strip: any) {
    this.rayAngle = rayAngle;
    this.strip = strip;
    this.cellX = 0;
    this.cellY = 0;
    this.rayHits = [];
    this.vx = 0;
    this.vy = 0;
    this.hx = 0;
    this.hy = 0;
    this.vertical = false;
    this.horizontal = false;
  }
}
