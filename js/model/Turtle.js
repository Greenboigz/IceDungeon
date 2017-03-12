DIV_SIZE = 4;

/**
 * This is the main character of the game
 */
class Turtle {

  /**
   * Skater object that traverse the Map
   * @param {number} x
   * @param {number} y
   * @param {number} grid
   */
  constructor(x, y, grid) {
    this._loc = new Vector(x,y);
    this._gridLoc = new Vector(x,y);
    this._grid = grid;
    this._direction = Direction.NORTH();
    this._stop = true;
    this._moving = false;
    this._alive = true;
    this._hiding = false;
    this._points = 0;
    this._coins = 0;
    this._dir_wait = Direction.NONE();
  }

  /**
   * Turns the skater in the correct direction and starts
   * @param {Direction} direction
   */
  turn(direction) {
    if (!this._moving && !this._hiding && !Direction.compare(direction, Direction.NONE())) {
      this._direction = direction;
      this._moving = true;
      this._stop = false;
      //console.log("Move in " + direction.toString())
    } else if (Direction.compare(this._dir_wait, Direction.NONE())) {
      this._dir_wait = direction;
    }
  }

  /**
   * Handles the button release for the turtle
   * @param {Direction} direction
   */
  unturn(direction) {
    if (Direction.compare(turtle.direction, direction)) {
      this._stop = true;
    } else if (Direction.compare(turtle._dir_wait, direction)) {
      this._dir_wait = Direction.NONE();
    }
  }

  /**
   * Moves the skater forward if it can
   */
  move() {
    this.consume();
    if (this._alive && this._moving) {
     var newLoc = Vector.add(this._gridLoc, this._direction.toVector());
     if (this._grid.getTile(newLoc.x, newLoc.y).isTraversible()) {
       this._loc = Vector.add(this._loc, this.step);
       if (!this.isBetween()) {
         this._gridLoc = this._loc;
         if (this._grid.getTile(this._gridLoc.x, this._gridLoc.y).isDeadly()) {
           this._moving = false;
           this.die();
         } else if (this._grid.getTile(this._gridLoc.x, this._gridLoc.y).isInterrupting()) {
           this._moving = false;
         } else if (!this._grid.getTile(this._gridLoc.x, this._gridLoc.y).isSlippery()) {
           if (this._stop) {
             if (Direction.compare(this._dir_wait, Direction.NONE()) || this._hiding) {
               this._moving = false;
             } else {
               this._direction = this._dir_wait;
               this._dir_wait = Direction.NONE();
               this._stop = false;
             }
           }
         }
       }
     } else {
       this._moving = false;
     }
    }
  }

  /**
   * Consumes the item on the tile if the tile contains an item
   */
  consume() {
    var tile = this._grid.getTile(this._gridLoc.x, this._gridLoc.y);
    if (tile.hasItem() && !this.isHiding()) {
      var item = tile.removeItem();
      this._points += item.points;
      this._coins += item.coins;
    }
  }

  /**
   * Causes the turtle to hide in its shell to avoid being hit by certain
   * projectiles or hits
   */
  hide() {
    if (!this._hiding) {
      this._hiding = true;
      this._stop = true;
    }
  }

  /**
   * Causes the turtle to come out of its shell to move.
   */
  unhide() {
    if (this._hiding) {
      this._hiding = false;
    }
  }

  /**
   * Checks if the turtle is hiding in its shell
   */
  isHiding() {
    return this._hiding;
  }

  /**
   * Gets the current tile of the turtle
   * @return {Tile}
   */
  get tile() {
    return this._grid.getTile(this._gridLoc.x, this._gridLoc.y);
  }

  /**
   * Gets the step the Turtle takes
   * @return {Vector}
   */
  get step() {
    if (this.tile.isSlippery()) {
      return Vector.scale(this._direction.toVector(), 1/DIV_SIZE);
    } else {
      return Vector.scale(this._direction.toVector(), 1/DIV_SIZE/2)
    }
  }

  /**
   * Gets the vector for the center of the person
   * @return {Vector}
   */
  get center() {
    return Vector.add(this._loc, new Vector(0.5, 0.5));
  }

  /**
   * Checks if the turtle is on lond
   * @return {boolean}
   */
  isOnLand() {
    var water = new Water(0,0);
    var tile_front = this._grid.getTile(this.front.x, this.front.y);
    var tile_back = this._grid.getTile(this.back.x, this.back.y);
    return !Tile.compare(tile_front, water) || !Tile.compare(tile_back, water);
  }


  /**
   * Gets the back of the turtle
   * @return {Vector}
   */
  get back() {
    if (Direction.compare(this._direction, Direction.NORTH())) {
      return new Vector(this._loc.x, Math.floor(this._loc.y));
    } else if (Direction.compare(this._direction, Direction.EAST())) {
      return new Vector(Math.floor(this._loc.x), this._loc.y);
    } else if (Direction.compare(this._direction, Direction.SOUTH())) {
      return new Vector(this._loc.x, Math.ceil(this._loc.y));
    } else if (Direction.compare(this._direction, Direction.WEST())) {
      return new Vector(Math.ceil(this._loc.x), this._loc.y);
    } else {
      throw "Direction is not set";
    }
  }

  /**
   * Gets the front of the turtle
   * @return {Vector}
   */
  get front() {
    if (Direction.compare(this._direction, Direction.NORTH())) {
      return new Vector(this._loc.x, Math.ceil(this._loc.y));
    } else if (Direction.compare(this._direction, Direction.EAST())) {
      return new Vector(Math.ceil(this._loc.x), this._loc.y);
    } else if (Direction.compare(this._direction, Direction.SOUTH())) {
      return new Vector(this._loc.x, Math.floor(this._loc.y));
    } else if (Direction.compare(this._direction, Direction.WEST())) {
      return new Vector(Math.floor(this._loc.x), this._loc.y);
    } else {
      throw "Direction is not set";
    }
  }

  /**
   * Gets the direction of the turtle
   * @return {Direction}
   */
  get direction() {
    return this._direction;
  }

  /**
   * Gets the pending direction of the turtle
   * @return {Direction}
   */
  get pending_direction() {
    return this._dir_wait;
  }

  /**
   * Get location of the skater
   * @return {Vector}
   */
  get location() {
    return this._loc;
  }

  get gridLocation() {
    return this._gridLoc;
  }

  /**
   * Checks if the turtle is between tiles
   * @return {boolean}
   */
  isBetween() {
    return !Vector.compare(this._loc, this.front);
  }

   /**
    * Get location of the skater
    * @return {Vector}
    */
   getLocation() {
     return this._loc;
   }

   /**
    * Sets location of the skater
    * @param {number} x
    * @param {number} y
    */
   setLocation(x, y) {
     this._loc = new Vector(x,y);
   }

   /**
    * Handles when the skater dies
    */
   die() {
     this._alive = false;
   }

   /**
    * Gets the name of the image associated with the turtle
    * @return {string}
    */
   get image2() {
     if (this._alive) {
       if (this._hiding) {
         return "turtle_hidden";
       } else {
         if (this._moving) {
           return "turtle";
         } else {
           return "turtle_stationary";
         }
       }
     }
   }

   /**
    * Gets the name of the image associated with the turtle
    * @return {string}
    */
   get image() {
     if (this._alive) {
       if (this._hiding) {
         if (!this.isOnLand()) {
           return "swimming_turtle_hidden";
         } else {
           return "turtle_hidden";
         }
       } else {
         if (this._moving) {
           if (!this.isOnLand()) {
             return "swimming_turtle";
           } else {
             return "turtle";
           }
         } else {
           if (!this.isOnLand()) {
             return "swimming_turtle_stationary";
           } else {
             return "turtle_stationary";
           }
         }
       }
     }
   }

}
