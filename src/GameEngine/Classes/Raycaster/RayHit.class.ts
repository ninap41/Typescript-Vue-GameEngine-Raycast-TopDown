import type { Sprite } from "./Sprite.class";

export class RayHit {
  x: any;
  y: any;
  strip: any;
  tileX: any;
  distance: any;
  correctDistance: any;
  vertical: any;
  horizontal: any;
  wallType: any;
  rayAngle: any;
  sprite: Sprite | null;
  constructor() {
    this.x = 0; // world coordinates of hit
    this.y = 0;
    this.strip = 0; // screen column
    this.tileX = 0; // where inside the wall that was hit, used for texture mapping
    this.distance = 0; // distance between player and wall
    this.correctDistance = 0; // distance to correct for fishbowl effect
    this.vertical = false; // vertical cell hit
    this.horizontal = false; // horizontal cell hit
    this.wallType = 0; // type of wall
    this.rayAngle = 0; // angle of ray hitting the wall
    this.sprite = null; // save sprite hit
  }

  static spriteRayHit(sprite: Sprite, distX: any, distY: any, strip: any, rayAngle: any) {
    let squaredDistance = distX * distX + distY * distY;
    let rayHit = new RayHit();
    rayHit.sprite = sprite;
    rayHit.strip = strip;
    rayHit.rayAngle = rayAngle;
    rayHit.distance = Math.sqrt(squaredDistance);
    return rayHit;
  }
}
