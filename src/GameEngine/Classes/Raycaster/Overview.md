/\* This is no longer called by us anymore because it interferes with the pixel manipulation of floor/ceiling texture mapping.

https://stackoverflow.com/a/46920541/1645045 https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio

sharpenCanvas() { // Set display size (css pixels). let sizew = this.displayWidth; let sizeh = this.displayHeight; this.mainCanvas.style.width = sizew + "px"; this.mainCanvas.style.height = sizeh + "px";

    // Set actual size in memory (scaled to account for extra pixel density).
    let scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    this.mainCanvas.width = Math.floor(sizew * scale);
    this.mainCanvas.height = Math.floor(sizeh * scale);

    // Normalize coordinate system to use css pixels.
    this.mainCanvasContext.scale(scale, scale);

} \*/

// Draws the entire sprite // drawSprite(rayHit) // { // let rc = this.spriteScreenPosition(rayHit.sprite) // this.drawTexturedWall(this.spriteImageData, 0, 0, this.textureSize, this.textureSize, rc.x, rc.y, rc.w, rc.h) // }

/\*\*

- Draws only the vertical part of the sprite corresponding to the current screen strip \*/

/\* Floor Casting Algorithm: We want to find the location where the ray hits the floor (F) 1. Find the distance of F from the player's "feet" 2. Rotate the distance using the current ray angle to find F relative to the player 3. Translate the F using the player's position to get its world coordinates 4. Map the world coordinates to texture coordinates

    Step 1 is the most complicated and the following explains how to
    calculate the floor distance

    ===================[ Floor Casting Side View ]=======================
    Refer to the diagram below. To get the floor distance relative to the
    player, we can use similar triangle principle:
       dy = height between current screen y and center y
          = y - (displayHeight/2)
       floorDistance / eyeHeight = currentViewDistance / dy
       floorDistance = eyeHeight * currentViewDistance / dy

                               current
                          <-view distance->
                       -  +----------------E <-eye
                       ^  |              / ^
                 dy--> |  |          /     |
                       |  |      /         |
        ray            v  |  /             |
           \           -  y                |<--eyeHeight
            \         /   |                |
             \    /       |<--view         |
              /           |   plane        |
          /               |                |
      /                   |                v
     F--------------------------------------  Floor bottom
     <----------  floorDistance  ---------->

    ======================[ Floor Casting Top View ]=====================
    But we need to know the current view distance.
    The view distance is not constant!
    In the center of the screen the distance is shortest.
    But for other angles it changes and is longer.

                               player center ray
                        F         |
                         \        |
                          \ <-dx->|
                 ----------x------+-- view plane -----
       currentViewDistance  \     |               ^
                     |       \    |               |
                     +----->  \   |        center view distance
                               \  |               |
                                \ |               |
                                 \|               v
                                  O--------------------

     We can calculate the current view distance using Pythogaras theorem:
       x  = current strip x
       dx = distance of x from center of screen
       dx = abs(screenWidth/2 - x)
       currentViewDistance = sqrt(dx*dx + viewDist*viewDist)

     We calculate and save all the view distances in this.viewDistances using
     createViewDistances()

\*/

/\*

       CREATE RAY ANGLES

    Calculate and save the ray angles from left to right of screen.

          screenX
          <------
          +-----+------+  ^
          \     |     /   |
           \    |    /    |
            \   |   /     | this.viewDist
             \  |  /      |
              \a| /       |
               \|/        |
                v         v

    tan(a) = screenX / this.viewDist
    a = atan( screenX / this.viewDist )

\*/

/\* on cell hit

- Called when a cell in the grid has been hit by the current ray
-
- If searching for vertical lines, return true to continue search for next vertical line,
- or false to stop searching for vertical lines
-
- If searching for horizontal lines, return true to continue search for next horizontal line
- or false to stop searching for horizontal lines
-
- @param ray Current RayState
- @return true to continue searching for next line, false otherwise \*/
