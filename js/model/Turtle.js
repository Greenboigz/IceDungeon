/**
 * This is the main character of the game
 */
class Turtle extends Protagonist {

  /**
   * Turtle object that traverse the Map
   * @param {number} x
   * @param {number} y
   * @param {number} grid
   */
  constructor(x, y, grid) {
    super(x, y, grid);
    this._hiding = false;
  }

  /**
   * Turns the turtle in the correct direction and starts
   * @param {Direction} direction
   */
  turn(direction) {
    this._moves.press(direction);
    if (!this._moving && !this._hiding) {
      this._moving = true;
    }
  }

  /**
   * Handles the button release for the turtle
   * @param {Direction} direction
   */
  unturn(direction) {
    this._moves.release(direction);
  }

  /**
   * Checks if the turtle can turn
   * @return {boolean}
   */
  canTurn() {
    return !this._hiding && !Direction.compare(this._moves.direction, Direction.NONE()) && !this.isBetween() && !(this._moving && this._grid.getTile(this._gridLoc.x, this._gridLoc.y).isSlippery());
  }

  /**
   * Moves the skater forward if it can
   */
  move() {
    this.consume();
    if (this._alive && !this._stopped) {
      if (this.canTurn()) {
        this._direction = this._moves.direction;
        this._moving = true;
      }
      if (this._moving) {
        var newLoc = Vector.add(this._gridLoc, this.unit_step);
        if (this._grid.getTile(newLoc.x, newLoc.y).isTraversible()) {
          this._loc = Vector.add(this._loc, this.step);
          if (Vector.compare(this._loc, Vector.round(this._loc)), this.speed/2) {
            this._loc = Vector.round(this._loc);
          }
          if (!this.isBetween()) {
            this._gridLoc = this._loc;
            if (this._grid.getTile(this._gridLoc.x, this._gridLoc.y).isDeadly()) {
              this._moving = false;
              this.die();
            } else if (this._grid.getTile(this._gridLoc.x, this._gridLoc.y).isInterrupting()) {
              this._moving = false;
            } else if (!this._grid.getTile(this._gridLoc.x, this._gridLoc.y).isSlippery()) {
              if (Direction.compare(this._moves.direction, Direction.NONE()) || this._hiding) {
                this._moving = false;
              } else {
                this._direction = this._moves.direction;
              }
            }
          }
        } else {
          this._moving = false;
        }
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
      if (item.isKey()) {
        this._keys.push(item);
      }
    }
  }

  /**
   * Causes the protagonist to perform its special move
   */
  special() {
    this.hide();
  }

  unspecial() {
    this.unhide();
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
   * @return {boolean}
   */
  isHiding() {
    return this._hiding;
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
     } else {
       return "";
     }
   }

}
