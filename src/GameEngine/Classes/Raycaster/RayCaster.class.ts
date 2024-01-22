import { RayHit } from "./RayHit.class";
import { RayState } from "./RayState.class";
import { Sprite } from "./Sprite.class";

const DESIRED_FPS = 30; // was 120
const UPDATE_INTERVAL = Math.trunc(1000 / DESIRED_FPS); //framrate(update interval)

export class Raycaster {
  screenView = 0;
  map: any;
  tileSize: any;
  player: any;
  sprites: any;
  stripWidth: any;
  ceilingHeight: any;
  mainCanvas: any;
  mapWidth: any;
  mapHeight: any;
  displayWidth: any;
  displayHeight: any;
  rayCount: any;
  worldWidth: any;
  worldHeight: any;
  textureSize: any;
  fovRadians: any;
  viewDist: any;
  rayAngles: any;
  viewDistances: any;
  backBuffer: any;
  mainCanvasContext: any;
  screenImageData: any;
  textureIndex: any;
  textureImageDatas: any;
  texturesLoadedCount: any;
  texturesLoaded: any;

  //maybe
  past: any;
  floorImageData: any;
  ceilingImageData: any;
  wallsImageData: any;
  spriteImageData: any;
  static get TWO_PI() {
    return Math.PI * 2;
  }

  static get MINIMAP_SCALE() {
    return 14;
  }

  initMap(map?: any) {
    this.map = map;
  }

  initPlayer() {
    this.player = {
      x: 16 * this.tileSize, // current x, y position in game units
      y: 10 * this.tileSize,
      z: 0,
      dir: 0, // the direction that the player is turning, either -1 for left or 1 for right.
      rot: 0, // the current angle of rotation. Counterclockwise is positive.
      speed: 0, // is the playing moving forward (speed = 1) or backwards (speed = -1).
      moveSpeed: Math.round(this.tileSize / ((DESIRED_FPS / 60.0) * 16)), // how far (in map units) does the player move each step/update
      rotSpeed: (1.5 * Math.PI) / 180, // how much does the player rotate each step/update (in radians)
    };
  }

  initSprites() {
    //GIF as sprite sheet
    // Put sprite in center of cell
    const tileSizeHalf = Math.floor(this.tileSize / 2);
    let spritePositions = [
      [18 * this.tileSize + tileSizeHalf, 8 * this.tileSize + tileSizeHalf], // coordinates of sprite 19, 9
      [18 * this.tileSize + tileSizeHalf, 12 * this.tileSize + tileSizeHalf], // coordinates of sprite 19, 11
      [12 * this.tileSize + tileSizeHalf, 8 * this.tileSize + tileSizeHalf], // coordinates of sprite 11, 7
    ];

    let sprite = null;
    this.sprites = [];

    for (let pos of spritePositions) {
      let sprite = new Sprite(pos[0], pos[1], 0, this.tileSize, this.tileSize);
      this.sprites.push(sprite);
    }
  }

  resetSpriteHits() {
    for (let sprite of this.sprites) {
      sprite.hit = false;
      sprite.screenPosition = null;
    }
  }

  findSpritesInCell(cellX: any, cellY: any, onlyNotHit = false) {
    let spritesFound = [];
    for (let sprite of this.sprites) {
      if (onlyNotHit && sprite.hit) {
        continue;
      }
      let spriteCellX = Math.floor(sprite.x / this.tileSize);
      let spriteCellY = Math.floor(sprite.y / this.tileSize);
      if (cellX == spriteCellX && cellY == spriteCellY) {
        spritesFound.push(sprite);
      }
    }
    return spritesFound;
  }

  constructor(
    mainCanvas: any,
    map: Array<any>,
    displayWidth = 640,
    displayHeight = 360,
    tileSize = 128,
    textureSize = 64,
    fovDegrees = 20 //Originally 90 field of view for rotation, percentages
  ) {
    this.initMap();
    this.stripWidth = 1; // leave this at 1 for now
    this.ceilingHeight = 1; // ceiling height in blocks
    this.mainCanvas = mainCanvas;
    this.map = map;

    this.mapWidth = this.map[0].length;
    this.mapHeight = this.map.length;
    this.displayWidth = displayWidth;
    this.displayHeight = displayHeight;
    this.rayCount = Math.ceil(displayWidth / this.stripWidth);
    this.tileSize = tileSize;
    this.worldWidth = this.mapWidth * this.tileSize;
    this.worldHeight = this.mapHeight * this.tileSize;
    this.textureSize = textureSize;
    this.fovRadians = (fovDegrees * Math.PI) / 180;
    this.viewDist = this.displayWidth / 2 / Math.tan(this.fovRadians / 2);
    this.rayAngles = null;
    this.viewDistances = null;
    this.backBuffer = null;

    this.mainCanvasContext;
    this.screenImageData;
    this.textureIndex = 0;
    this.textureImageDatas = [];
    this.texturesLoadedCount = 0;
    this.texturesLoaded = false;
    this.initPlayer();
    this.initSprites();
  }

  /**
   * https://stackoverflow.com/a/35690009/1645045
   */
  static setPixel(imageData: any, x: any, y: any, r: any, g: any, b: any, a: any) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
  }

  static getPixel(imageData: any, x: any, y: any) {
    let index = (x + y * imageData.width) * 4;
    return {
      r: imageData.data[index + 0],
      g: imageData.data[index + 1],
      b: imageData.data[index + 2],
      a: imageData.data[index + 3],
    };
  }

  init() {
    this.bindKeys();
    this.initScreen();

    this.drawMiniMap();
    this.createRayAngles();
    this.createViewDistances();
    this.past = Date.now();
    this.gameCycle();
  }

  initScreen() {
    this.mainCanvasContext = this.mainCanvas.getContext("2d");
    let screen: any = document.getElementById("screen");
    screen.style.width = this.displayWidth + "px";
    screen.style.height = this.displayHeight + "px";
    screen.style.backgroundColor = "black";
    this.mainCanvas.width = this.displayWidth;
    this.mainCanvas.height = this.displayHeight;
    this.loadFloorCeilingImages();
  }

  loadFloorCeilingImages() {
    // Draw images on this temporary canvas to grab the ImageData pixels
    let canvas: any = document.createElement("canvas");

    // Canvas needs to be big enough for the wall texture
    canvas.width = this.textureSize * 2;
    canvas.height = this.textureSize * 4;
    let context: any = canvas.getContext("2d");

    // Save floor image pixels
    let floorimg: any = document.getElementById("floorimg");
    context.drawImage(floorimg, 0, 0, floorimg.width, floorimg.height);
    this.floorImageData = context.getImageData(0, 0, this.textureSize, this.textureSize);

    // Save ceiling image pixels
    let ceilingimg: any = document.getElementById("ceilingimg");
    context.drawImage(ceilingimg, 0, 0, ceilingimg.width, ceilingimg.height);
    this.ceilingImageData = context.getImageData(0, 0, this.textureSize, this.textureSize);
    console.log("ceilingimg.width=" + ceilingimg.width);
    console.log("ceilingimg.height=" + ceilingimg.height);

    // Save walls image pixels
    let wallsImage: any = document.getElementById("wallsImage");
    context.drawImage(wallsImage, 0, 0, wallsImage.width, wallsImage.height);
    this.wallsImageData = context.getImageData(0, 0, wallsImage.width, wallsImage.height);
    console.log("wallsImage.width=" + wallsImage.width);
    console.log("wallsImage.height=" + wallsImage.height);

    // Save zombie image pixels
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    let spriteImage: any = document.getElementById("sprite1");

    //https://stackoverflow.com/questions/48234696/how-to-put-a-gif-with-canvas
    context.drawImage(spriteImage, 0, 0, spriteImage.width, spriteImage.height);
    this.spriteImageData = context.getImageData(0, 0, spriteImage.width, spriteImage.height);
    console.log("spriteImage.width=" + spriteImage.width);
    console.log("spriteImage.height=" + spriteImage.height);
  }

  // bind keyboard events to game functions (movement, etc)
  bindKeys() {
    let this2 = this;
    document.onkeydown = function (e) {
      e = e || window.event;
      console.log("e.keycode", e.keyCode);
      if (e.keyCode === 77) {
        this2.screenView = 1;
      } else {
        this2.screenView = 0;
      }
      switch (
        e.keyCode // which key was pressed?
      ) {
        case 38: // up, move player forward, ie. increase speed
          this2.player.speed = 1;
          break;
        case 87: // W should be rotation of Z
          // this2.player.rot += 1;
          break;
        case 83: // S ,should be rotations of z
          // this2.player.rot -= 1;
          break;
        case 40: // down, move player backward, set negative speed
          this2.player.speed = -1;
          break;
        case 37: // left, rotate player left
          this2.player.dir = -1;
          break;
        case 39: // right, rotate player right
          this2.player.dir = 1;
          break;
      }
    };

    document.onkeyup = function (e) {
      e = e || window.event;
      switch (e.keyCode) {
        case 38:
        case 40:
          this2.player.speed = 0; // stop the player movement when up/down key is released
          break;
        case 37:
        case 39:
          this2.player.dir = 0;
          break;
      }
    };
  }

  gameCycle() {
    this.updateMiniMap();

    let now = Date.now();
    let timeElapsed = now - this.past;
    this.past = now;
    this.move(timeElapsed);

    let rayHits: Array<RayHit> = [];
    this.resetSpriteHits();
    this.castRays(rayHits);
    this.sortRayHits(rayHits);
    this.drawWorld(rayHits);
    let this2 = this;
    window.requestAnimationFrame(function () {
      this2.gameCycle();
    });
  }

  stripScreenHeight(screenDistance: any, correctDistance: any, heightInGame: any) {
    return Math.round((screenDistance / correctDistance) * heightInGame);
  }

  drawTexturedWall(
    imgdata: any,
    srcX: any,
    srcY: any,
    srcW: any,
    srcH: any,
    dstX: any,
    dstY: any,
    dstW: any,
    dstH: any
  ) {
    srcX = Math.trunc(srcX);
    srcY = Math.trunc(srcY);
    dstX = Math.trunc(dstX);
    dstY = Math.trunc(dstY);
    const dstEndX = Math.trunc(dstX + dstW);
    const dstEndY = Math.trunc(dstY + dstH);
    const dx = dstEndX - dstX;
    const dy = dstEndY - dstY;

    // Nothing to draw
    if (dx === 0 || dy === 0) {
      return;
    }

    // Linear interpolation variables
    let screenStartX = dstX;
    let screenStartY = dstY;
    let texStartX = srcX;
    let texStartY = srcY;
    // just put world point here
    const texStepX = srcW / dx;
    const texStepY = srcH / dy;

    // Skip top pixels off screen
    if (screenStartY < 0) {
      texStartY = srcY + (0 - screenStartY) * texStepY;
      screenStartY = 0;
    }

    // Skip left pixels off screen
    if (screenStartX < 0) {
      texStartX = srcX + (0 - screenStartX) * texStepX;
      screenStartX = 0;
    }

    for (
      let texY = texStartY, screenY = screenStartY;
      screenY < dstEndY && screenY < this.displayHeight;
      screenY++, texY += texStepY
    ) {
      for (
        let texX = texStartX, screenX = screenStartX;
        screenX < dstEndX && screenX < this.displayWidth;
        screenX++, texX += texStepX
      ) {
        let textureX = Math.trunc(texX);
        let textureY = Math.trunc(texY);

        let srcPixel = Raycaster.getPixel(imgdata, textureX, textureY);
        if (srcPixel.a) {
          if (dy < 200) {
            Raycaster.setPixel(this.backBuffer, screenX, screenY, srcPixel.r, srcPixel.g, srcPixel.b, dy - dy * 0.1);
          } else {
            Raycaster.setPixel(this.backBuffer, screenX, screenY, srcPixel.r, srcPixel.g, srcPixel.b, 255);
          }
        }
      }
    }
  }

  drawSpriteStrip(rayHit: any) {
    let sprite = rayHit.sprite;
    if (!rayHit.sprite.screenPosition) {
      rayHit.sprite.screenPosition = this.spriteScreenPosition(rayHit.sprite);
    }
    let rc = rayHit.sprite.screenPosition;
    // sprite first strip is ahead of current strip
    if (rc.x > rayHit.strip) {
      return;
    }
    // sprite last strip is before current strip
    if (rc.x + rc.w < rayHit.strip) {
      return;
    }
    let diffX = Math.trunc(rayHit.strip - rc.x);
    let dstX = rc.x + diffX; // skip left parts of sprite already drawn
    let srcX = Math.trunc((diffX / rc.w) * this.textureSize);
    let srcW = 1;
    if (srcX >= 0 && srcX < this.textureSize) {
      this.drawTexturedWall(this.spriteImageData, srcX, 0, srcW, this.textureSize, dstX, rc.y, this.stripWidth, rc.h);
    }
  }

  drawWallStrip(rayHit: any, textureX: any, textureY: any, wallScreenHeight: any) {
    let swidth = 1;
    let sheight = this.textureSize;
    let imgx = rayHit.strip * this.stripWidth;
    let imgy = (this.displayHeight - wallScreenHeight) / 2;
    let imgw = this.stripWidth;
    let imgh = wallScreenHeight;
    //find where in wall image data === worldx and worldY
    this.drawTexturedWall(this.wallsImageData, textureX, textureY, swidth, sheight, imgx, imgy, imgw, imgh);
    for (let level = 1; level < this.ceilingHeight; ++level) {
      this.drawTexturedWall(
        this.wallsImageData,
        textureX,
        textureY,
        swidth,
        sheight,
        imgx,
        imgy - level * wallScreenHeight,
        imgw,
        imgh
      );
    }
  }

  drawTexturedFloor(rayHits: any) {
    for (let rayHit of rayHits) {
      const wallScreenHeight = this.stripScreenHeight(this.viewDist, rayHit.correctDistance, this.tileSize);
      const centerY = this.displayHeight / 2;
      const eyeHeight = this.tileSize / 2 + this.player.z;
      const screenX = rayHit.strip * this.stripWidth;
      const currentViewDistance = this.viewDistances[rayHit.strip];
      const cosRayAngle = Math.cos(rayHit.rayAngle);
      const sinRayAngle = Math.sin(rayHit.rayAngle);
      let screenY = Math.max(centerY, Math.floor((this.displayHeight - wallScreenHeight) / 2) + wallScreenHeight);
      for (; screenY < this.displayHeight; screenY++) {
        let dy = screenY - centerY;
        let floorDistance = (currentViewDistance * eyeHeight) / dy;
        let worldX = this.player.x + floorDistance * cosRayAngle;
        let worldY = this.player.y + floorDistance * -sinRayAngle;
        if (worldX < 0 || worldY < 0 || worldX >= this.worldWidth || worldY >= this.worldHeight) {
          continue;
        }
        let textureX = Math.floor(worldX) % this.tileSize;
        let textureY = Math.floor(worldY) % this.tileSize;
        if (this.tileSize != this.textureSize) {
          textureX = Math.floor((textureX / this.tileSize) * this.textureSize);
          textureY = Math.floor((textureY / this.tileSize) * this.textureSize);
        }
        //should be here
        let srcPixel = Raycaster.getPixel(this.floorImageData, textureX, textureY);
        if (dy < 200) {
          Raycaster.setPixel(this.backBuffer, screenX, screenY, srcPixel.r, srcPixel.g, srcPixel.b, dy - -dy * 0.1);
        } else {
          Raycaster.setPixel(this.backBuffer, screenX, screenY, srcPixel.r, srcPixel.g, srcPixel.b, 255);
        }
      }
    }
  }

  drawTexturedCeiling(rayHits: any) {
    for (let rayHit of rayHits) {
      const wallScreenHeight = this.stripScreenHeight(this.viewDist, rayHit.correctDistance, this.tileSize);
      const centerY = this.displayHeight / 2;
      const eyeHeight = this.tileSize / 2 + this.player.z;
      const screenX = rayHit.strip * this.stripWidth;
      const currentViewDistance = this.viewDistances[rayHit.strip];
      const cosRayAngle = Math.cos(rayHit.rayAngle);
      const sinRayAngle = Math.sin(rayHit.rayAngle);
      const currentCeilingHeight = this.tileSize * this.ceilingHeight;
      let screenY = Math.min(centerY - 1, Math.floor((this.displayHeight - wallScreenHeight) / 2) - 1);
      for (; screenY >= 0; screenY--) {
        let dy = centerY - screenY;
        let ceilingDistance = (currentViewDistance * (currentCeilingHeight - eyeHeight)) / dy;
        let worldX = this.player.x + ceilingDistance * cosRayAngle;
        let worldY = this.player.y + ceilingDistance * -sinRayAngle;
        if (worldX < 0 || worldY < 0 || worldX >= this.worldWidth || worldY >= this.worldHeight) {
          continue;
        }
        let textureX = Math.floor(worldX) % this.tileSize;
        let textureY = Math.floor(worldY) % this.tileSize;
        if (this.tileSize != this.textureSize) {
          textureX = Math.floor((textureX / this.tileSize) * this.textureSize);
          textureY = Math.floor((textureY / this.tileSize) * this.textureSize);
        }
        let srcPixel = Raycaster.getPixel(this.ceilingImageData, textureX, textureY);

        if (dy < 255) {
          Raycaster.setPixel(this.backBuffer, screenX, screenY, srcPixel.r, srcPixel.g, srcPixel.b, dy - -dy * 0.1);
        } else {
          Raycaster.setPixel(this.backBuffer, screenX, screenY, srcPixel.r, srcPixel.g, srcPixel.b, 255);
        }
      }
    }
  }

  drawWorld(rayHits: any) {
    let height: any = document.getElementById("ceilingHeight");
    this.ceilingHeight = height.value;
    if (!this.backBuffer) {
      this.backBuffer = this.mainCanvasContext.createImageData(this.displayWidth, this.displayHeight);
    }

    this.drawTexturedFloor(rayHits);
    this.drawTexturedCeiling(rayHits);

    for (let rayHit of rayHits) {
      if (rayHit.sprite) {
        this.drawSpriteStrip(rayHit);
      } else {
        let wallScreenHeight = Math.round((this.viewDist / rayHit.correctDistance) * this.tileSize);
        let textureX = (rayHit.horizontal ? this.textureSize : 0) + (rayHit.tileX / this.tileSize) * this.textureSize;
        let textureY = this.textureSize * (rayHit.wallType - 1);
        this.drawWallStrip(rayHit, textureX, textureY, wallScreenHeight);
      }
    }
    this.mainCanvasContext.putImageData(this.backBuffer, 0, 0);
  }

  createRayAngles() {
    if (!this.rayAngles) {
      this.rayAngles = [];
      for (let i = 0; i < this.rayCount; i++) {
        let screenX = (this.rayCount / 2 - i) * this.stripWidth;
        let rayAngle = Math.atan(screenX / this.viewDist);
        this.rayAngles.push(rayAngle);
      }
      console.log("No. of ray angles=" + this.rayAngles.length);
    }
  }

  /**
    Calculate and save the view distances from left to right of screen.
  */
  createViewDistances() {
    if (!this.viewDistances) {
      this.viewDistances = [];
      for (let x = 0; x < this.rayCount; x++) {
        let dx = (this.rayCount / 2 - x) * this.stripWidth;
        let currentViewDistance = Math.sqrt(dx * dx + this.viewDist * this.viewDist);
        this.viewDistances.push(currentViewDistance);
      }
      console.log("No. of view distances=" + this.viewDistances.length);
    }
  }

  sortRayHits(rayHits: any) {
    rayHits.sort(function (a: any, b: any) {
      return a.distance > b.distance ? -1 : 1;
    });
  }

  castRays(rayHits: any) {
    for (let i = 0; i < this.rayAngles.length; i++) {
      let rayAngle = this.rayAngles[i];
      this.castSingleRay(rayHits, this.player.rot + rayAngle, i);
    }
  }

  onCellHit(ray: any) {
    let vx = ray.vx,
      vy = ray.vy,
      hx = ray.hx,
      hy = ray.hy;
    let up = ray.up,
      right = ray.right;
    let cellX = ray.cellX,
      cellY = ray.cellY;
    let wallHit = ray.wallHit;
    let horizontal = ray.horizontal;
    let wallFound = false;
    let stripIdx = ray.strip;
    let rayAngle = ray.rayAngle;
    let rayHits = ray.rayHits;

    // Check for sprites in cell
    let spritesFound = this.findSpritesInCell(cellX, cellY, true);
    for (let sprite of spritesFound) {
      let spriteHit = RayHit.spriteRayHit(
        sprite,
        this.player.x - sprite.x,
        this.player.y - sprite.y,
        stripIdx,
        rayAngle
      );
      if (spriteHit.distance) {
        // sprite.hit = true
        rayHits.push(spriteHit);
      }
    }

    // Handle cell walls
    if (this.map[cellY][cellX] > 0) {
      let distX = this.player.x - (horizontal ? hx : vx);
      let distY = this.player.y - (horizontal ? hy : vy);
      let squaredDistance = distX * distX + distY * distY;
      if (!wallHit.distance || squaredDistance < wallHit.distance) {
        wallFound = true;
        wallHit.distance = squaredDistance;
        wallHit.horizontal = horizontal;
        if (horizontal) {
          wallHit.x = hx;
          wallHit.y = hy;
          wallHit.tileX = hx % this.tileSize;
          // Facing down, flip image
          if (!up) {
            wallHit.tileX = this.tileSize - wallHit.tileX;
          }
        } else {
          wallHit.x = vx;
          wallHit.y = vy;
          wallHit.tileX = vy % this.tileSize;
          // Facing left, flip image
          if (!right) {
            wallHit.tileX = this.tileSize - wallHit.tileX;
          }
        }
        wallHit.wallType = this.map[cellY][cellX];
      }
    }
    return !wallFound;
  }

  /**
   * Called when the current ray has finished casting
   * @param ray The ending RayState
   */
  onRayEnd(ray: any) {
    let rayAngle = ray.rayAngle;
    let rayHits = ray.rayHits;
    let stripIdx = ray.strip;
    let wallHit = ray.wallHit;
    if (wallHit.distance) {
      wallHit.distance = Math.sqrt(wallHit.distance);
      wallHit.correctDistance = wallHit.distance * Math.cos(this.player.rot - rayAngle);
      wallHit.strip = stripIdx;

      wallHit.rayAngle = rayAngle;
      this.drawRay(wallHit.x, wallHit.y);
      rayHits.push(wallHit);
    }
  }

  castSingleRay(rayHits: any, rayAngle: any, stripIdx: any) {
    rayAngle %= Raycaster.TWO_PI;
    if (rayAngle < 0) rayAngle += Raycaster.TWO_PI;

    //   2  |  1
    //  ----+----
    //   3  |  4
    let right =
      (rayAngle < Raycaster.TWO_PI * 0.25 && rayAngle >= 0) || // Quadrant 1
      rayAngle > Raycaster.TWO_PI * 0.75; // Quadrant 4
    let up = rayAngle < Raycaster.TWO_PI * 0.5 && rayAngle >= 0; // Quadrant 1 and 2

    let ray: any = new RayState(rayAngle, stripIdx);

    ray.rayHits = rayHits;
    ray.right = right;
    ray.up = up;
    ray.wallHit = new RayHit();

    // Process current player cell
    ray.cellX = Math.floor(this.player.x / this.tileSize);
    ray.cellY = Math.floor(this.player.y / this.tileSize);
    this.onCellHit(ray);

    // closest vertical line
    ray.vx = right
      ? Math.floor(this.player.x / this.tileSize) * this.tileSize + this.tileSize
      : Math.floor(this.player.x / this.tileSize) * this.tileSize - 1;
    ray.vy = this.player.y + (this.player.x - ray.vx) * Math.tan(rayAngle);

    // closest horizontal line
    ray.hy = up
      ? Math.floor(this.player.y / this.tileSize) * this.tileSize - 1
      : Math.floor(this.player.y / this.tileSize) * this.tileSize + this.tileSize;
    ray.hx = this.player.x + (this.player.y - ray.hy) / Math.tan(rayAngle);

    // vector for next vertical line
    let stepvx = right ? this.tileSize : -this.tileSize;
    let stepvy = this.tileSize * Math.tan(rayAngle);

    // vector for next horizontal line
    let stephy = up ? -this.tileSize : this.tileSize;
    let stephx = this.tileSize / Math.tan(rayAngle);

    // tan() returns positive values in Quadrant 1 and Quadrant 4
    // But window coordinates need negative coordinates for Y-axis so we reverse them
    if (right) {
      stepvy = -stepvy;
    }

    // tan() returns stepx as positive in quadrant 3 and negative in quadrant 4
    // This is the opposite of horizontal window coordinates so we need to reverse the values
    // when angle is facing down
    if (!up) {
      stephx = -stephx;
    }

    // Vertical lines
    ray.vertical = true;
    ray.horizontal = false;
    while (ray.vx >= 0 && ray.vx < this.worldWidth && ray.vy >= 0 && ray.vy < this.worldHeight) {
      ray.cellX = Math.floor(ray.vx / this.tileSize);
      ray.cellY = Math.floor(ray.vy / this.tileSize);
      if (this.onCellHit(ray)) {
        ray.vx += stepvx;
        ray.vy += stepvy;
      } else {
        break;
      }
    }

    // Horizontal lines
    ray.vertical = false;
    ray.horizontal = true;
    while (ray.hx >= 0 && ray.hx < this.worldWidth && ray.hy >= 0 && ray.hy < this.worldHeight) {
      ray.cellX = Math.floor(ray.hx / this.tileSize);
      ray.cellY = Math.floor(ray.hy / this.tileSize);
      if (this.onCellHit(ray)) {
        ray.hx += stephx;
        ray.hy += stephy;
      } else {
        break;
      }
    }

    this.onRayEnd(ray);
  }

  /**
  Algorithm adapted from this article:
  https://dev.opera.com/articles/3d-games-with-canvas-and-raycasting-part-2/

               S----------+                       ------
                \         |                          ^
                 \        |                          |
                  \<--x-->|                     centerDistance
   spriteDistance  \------+--view plane -----        |
                    \     |               ^          |
                     \    |               |          |
                      \   |         viewDist         |
                       \sa|               |          |
                        \ |-----+         |          |
                         \| rot |         v          v
                          P-----+---------------------------

     S  = the sprite      dx  = S.x - P.x      sa  = spriteAngle
     P  = player          dy  = S.y - P.y      rot = player camera rotation

    totalAngle = spriteAngle + rot
    tan(spriteAngle) = x / viewDist
    cos(spriteAngle) = centerDistance / spriteDistance
  */
  spriteScreenPosition(sprite: any) {
    let rc = { x: 0, y: 0, w: 0, h: 0 };

    // Calculate angle between player and sprite
    // We use atan2() to find the sprite's angle if the player rotation was 0 degrees
    // Then we deduct the player's current rotation from it
    // Note that plus (+) is used to "deduct" instead of minus (-) because it takes
    // into account these facts:
    //   a) dx and dy use world coordinates, while atan2() uses cartesian coordinates.
    //   b) atan2() can return positive or negative angles based on the circle quadrant
    let dx = sprite.x - this.player.x;
    let dy = sprite.y - this.player.y;
    let totalAngle = Math.atan2(dy, dx);
    let spriteAngle = totalAngle + this.player.rot;

    // x distance from center line
    let x = Math.tan(spriteAngle) * this.viewDist;

    let spriteDistance = Math.sqrt(dx * dx + dy * dy);
    let centerDistance = Math.cos(spriteAngle) * spriteDistance;

    // spriteScreenWidth   spriteWorldWidth
    // ----------------- = ----------------
    //      viewDist        centerDistance
    let spriteScreenWidth = (this.tileSize * this.viewDist) / centerDistance;
    let spriteScreenHeight = spriteScreenWidth; // assume both width and height are the same

    rc.x =
      this.displayWidth / 2 +
      x - // get distance from left of screen
      spriteScreenWidth / 2; // deduct half of sprite width because x is center of sprite
    rc.y = (this.displayHeight - spriteScreenWidth) / 2.0;
    rc.w = spriteScreenWidth;
    rc.h = spriteScreenHeight;

    return rc;
  }

  drawRay(rayX: any, rayY: any) {
    let miniMapObjects: any = document.getElementById("minimapobjects");
    let objectCtx = miniMapObjects.getContext("2d");

    rayX = (rayX / (this.mapWidth * this.tileSize)) * 100;
    rayX = (rayX / 100) * Raycaster.MINIMAP_SCALE * this.mapWidth;
    rayY = (rayY / (this.mapHeight * this.tileSize)) * 100;
    rayY = (rayY / 100) * Raycaster.MINIMAP_SCALE * this.mapHeight;

    let playerX = (this.player.x / (this.mapWidth * this.tileSize)) * 100;
    playerX = (playerX / 100) * Raycaster.MINIMAP_SCALE * this.mapWidth;

    let playerY = (this.player.y / (this.mapHeight * this.tileSize)) * 100;
    playerY = (playerY / 100) * Raycaster.MINIMAP_SCALE * this.mapHeight;

    objectCtx.strokeStyle = "rgba(0,100,0,0.3)";
    objectCtx.lineWidth = 0.5;
    objectCtx.beginPath();
    objectCtx.moveTo(playerX, playerY);
    objectCtx.lineTo(rayX, rayY);
    objectCtx.closePath();
    objectCtx.stroke();
  }

  move(timeElapsed: any) {
    let timeBasedFactor = timeElapsed / UPDATE_INTERVAL;

    // speed = forward / backward = 1 or -1
    let moveStep = this.player.speed * this.player.moveSpeed * timeBasedFactor; // player will move this far along the current direction vector

    // dir = left / right = -1 or 1
    this.player.rot += -this.player.dir * this.player.rotSpeed * timeBasedFactor; // add rotation if player is rotating (this.player.dir != 0)

    // make sure the angle is between 0 and 360 degrees
    // while (this.player.rot < 0) this.player.rot += Raycaster.TWO_PI;
    // while (this.player.rot >= Raycaster.TWO_PI) this.player.rot -= Raycaster.TWO_PI;

    // cos(angle) = A / H = x / H
    // x = H * cos(angle)
    // sin(angle) = O / H = y / H
    // y = H * sin(angle)
    let newX = this.player.x + Math.cos(this.player.rot) * moveStep; // calculate new player position with simple trigonometry
    let newY = this.player.y + -Math.sin(this.player.rot) * moveStep;

    // Round down to integers
    newX = Math.floor(newX);
    newY = Math.floor(newY);

    let cellX = newX / this.tileSize;
    let cellY = newY / this.tileSize;

    if (this.isBlocking(cellX, cellY)) {
      // are we allowed to move to the new position?
      return; // no, bail out.
    }

    this.player.x = newX; // set new position
    this.player.y = newY;
  }

  isBlocking(x: any, y: any) {
    // first make sure that we cannot move outside the boundaries of the level
    if (y < 0 || y >= this.mapHeight || x < 0 || x >= this.mapWidth) return true;

    // return true if the map block is not 0, ie. if there is a blocking wall.
    return this.map[Math.floor(y)][Math.floor(x)] != 0;
  }

  updateMiniMap() {
    let miniMap: any = document.getElementById("minimap");
    let miniMapObjects: any = document.getElementById("minimapobjects");

    let objectCtx = miniMapObjects.getContext("2d");

    miniMapObjects.width = miniMapObjects.width;

    let playerX = (this.player.x / (this.mapWidth * this.tileSize)) * 100;
    playerX = (playerX / 100) * Raycaster.MINIMAP_SCALE * this.mapWidth;

    let playerY = (this.player.y / (this.mapHeight * this.tileSize)) * 100;
    playerY = (playerY / 100) * Raycaster.MINIMAP_SCALE * this.mapHeight;

    objectCtx.fillStyle = "red";
    objectCtx.fillRect(
      // draw a dot at the current player position
      playerX - 2,
      playerY - 2,
      4,
      4
    );

    objectCtx.strokeStyle = "red";
    objectCtx.beginPath();
    objectCtx.moveTo(playerX, playerY);
    objectCtx.lineTo(
      playerX + Math.cos(this.player.rot) * 4 * Raycaster.MINIMAP_SCALE,
      playerY + -Math.sin(this.player.rot) * 4 * Raycaster.MINIMAP_SCALE
    );
    objectCtx.closePath();
    objectCtx.stroke();
  }

  drawMiniMap() {
    let miniMap: any = document.getElementById("minimap"); // the actual map
    let miniMapCtr: any = document.getElementById("minimapcontainer"); // the container div element
    let miniMapObjects: any = document.getElementById("minimapobjects"); // the canvas used for drawing the objects on the map (player character, etc)

    miniMap.width = this.mapWidth * Raycaster.MINIMAP_SCALE; // resize the internal canvas dimensions
    miniMap.height = this.mapHeight * Raycaster.MINIMAP_SCALE; // of both the map canvas and the object canvas
    miniMapObjects.width = miniMap.width;
    miniMapObjects.height = miniMap.height;

    let w = this.mapWidth * Raycaster.MINIMAP_SCALE + "px"; // minimap CSS dimensions
    let h = this.mapHeight * Raycaster.MINIMAP_SCALE + "px";
    miniMap.style.width = miniMapObjects.style.width = miniMapCtr.style.width = w;
    miniMap.style.height = miniMapObjects.style.height = miniMapCtr.style.height = h;

    let ctx = miniMap.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, miniMap.width, miniMap.height);

    // loop through all blocks on the map
    for (let y = 0; y < this.mapHeight; y++) {
      for (let x = 0; x < this.mapWidth; x++) {
        let wall = this.map[y][x];
        if (wall > 0) {
          // if there is a wall block at this (x,y) ...
          ctx.fillStyle = "rgb(200,200,200)";
          ctx.fillRect(
            // ... then draw a block on the minimap
            x * Raycaster.MINIMAP_SCALE,
            y * Raycaster.MINIMAP_SCALE,
            Raycaster.MINIMAP_SCALE,
            Raycaster.MINIMAP_SCALE
          );
        }
      }
    }

    this.updateMiniMap();
  }
}
