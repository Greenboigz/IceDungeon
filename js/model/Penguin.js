/**
 * This is the main character of the game
 */
class Penguin extends Protagonist {

  /**
   * Turtle object that traverse the Map
   * @param {number} x
   * @param {number} y
   * @param {number} grid
   */
  constructor(x, y, grid) {
    super(x, y, grid);
    this._sliding = false;
  }

  /**
   * Turns the penguin in the correct direction and starts
   * @param {Direction} direction
   */
  turn(direction) {
    this._moves.press(direction);
    if (!this._moving && !this._sliding) {
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
    return !this._sliding && !Direction.compare(this._moves.direction, Direction.NONE()) && !this.isBetween() && !(this._moving && this._grid.getTile(this._gridLoc.x, this._gridLoc.y).isSlippery());
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
          if (Vector.compare(this._loc, Vector.round(this._loc), this.speed/2)) {
            this._loc = Vector.round(this._loc);
          }
          if (!this.isBetween()) {
            this._gridLoc = this._loc;
            if (this._grid.getTile(this._gridLoc.x, this._gridLoc.y).isDeadly()) {
              this._moving = false;
              this.die();
            } else if (this._grid.getTile(this._gridLoc.x, this._gridLoc.y).isInterrupting()) {
              this._moving = false;
              this.unslide();
            } else if (!this._grid.getTile(this._gridLoc.x, this._gridLoc.y).isSlippery()) {
              if (Direction.compare(this._moves.direction, Direction.NONE()) || this._sliding) {
                this._moving = false;
              } else {
                this._direction = this._moves.direction;
              }
            }
          }
          if (this.isSliding() && !this.isOnLand()) {
            this.unslide();
          }
        } else {
          this._moving = false;
          this.unslide();
        }
      }
    }
  }

  /**
   * Gets the speed of the protagonist
   * @return {Number}
   */
  get speed() {
    if (this.isSliding()) {
      return 1/DIV_SIZE;
    } else {
      if (this.isOnLand()) {
        return 1/(3*DIV_SIZE);
      } else {
        return 1/(2*DIV_SIZE);
      }
    }
  }

  /**
   * Causes the protagonist to perform its special move
   */
  special() {
    this.slide();
  }

  unspecial() {
    this.unslide();
  }

  /**
   * Causes the turtle to hide in its shell to avoid being hit by certain
   * projectiles or hits
   */
  slide() {
    if (this.isOnLand() && this._moving) {
      this._sliding = true;
    }
  }

  /**
   * Causes the turtle to come out of its shell to move.
   */
  unslide() {
    this._sliding = false;
  }

  /**
   * Checks if the turtle is sliding in its shell
   * @return {boolean}
   */
  isSliding() {
    return this._sliding;
  }

  /**
   * Gets the name of the image associated with the turtle
   * @return {string}
   */
  get image() {
    if (this._alive) {
      if (this._sliding) {
        return "penguin_sliding";
      } else {
        if (this._moving) {
          if (!this.isOnLand()) {
            return "swimming_penguin";
          } else {
            return "penguin";
          }
        } else {
          if (!this.isOnLand()) {
            return "swimming_penguin_stationary";
          } else {
            return "penguin_stationary";
          }
        }
      }
    } else {
      return "";
    }
  }

}
