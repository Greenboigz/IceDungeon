DIV_SIZE = 8;

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
    this._moving = false;
    this._alive = true;
    this._hiding = false;
  }

  /**
   * Turns the skater in the correct direction and starts
   * @param {Direction} direction
   */
  turn(direction) {
    if (!this._moving && !this._hiding) {
      this._direction = direction;
      this._moving = true;
    }
  }

  /**
   * Moves the skater forward if it can
   */
  move() {
    if (this._alive && this._moving) {
     var newLoc = Vector.add(this._gridLoc, this._direction.toVector());
     if (this._grid.getTile(newLoc.x, newLoc.y).isTraversible()) {
       this._loc = Vector.add(this._loc, Vector.scale(this._direction.toVector(), 1/DIV_SIZE));
       if (!this.isBetween()) {
         this._gridLoc = this._loc;
         if (this._grid.getTile(this._gridLoc.x, this._gridLoc.y).isInterrupting()) {
           this._moving = false;
           this.die();
         } else if (this._grid.getTile(this._gridLoc.x, this._gridLoc.y).isInterrupting()) {
           this._moving = false;
         }
       }
     } else {
       this._moving = false;
     }
    }
  }

  /**
   * Causes the turtle to hide in its shell to avoid being hit by certain
   * projectiles or hits
   */
  hide() {
    if (!this._hiding) {
      this._hiding = true;
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
    * Gets the vector for the center of the person
    * @return {Vector}
    */
   get center() {
     return Vector.add(this._loc, new Vector(0.5, 0.5));
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
   * Get location of the skater
   * @return {Vector}
   */
  get location() {
    return this._loc;
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
   get image() {
     if (this._alive) {
       if (this._hiding) {
         return "turtle_hidden";
       } else {
         return "turtle";
       }
     }
   }

}
