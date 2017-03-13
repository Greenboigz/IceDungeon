SPEED = 2;
BITING_IMG = "attacking_shark";
BITE_DURATION = 1000;

class Shark extends Enemy {

  constructor(location, direction, map) {
    super(location, direction, map, SPEED, "shark");
    this._biteStart = null;
  }

  /**
   * Handles all the movements of the enemy
   */
  move() {
    var front = Vector.add(this._gridLoc, this._direction.toVector());
    var tile = this._map.getTile(front.x, front.y);
    if (this._map.turtle.isAlive() && Vector.compare(this._map.turtle.gridLocation, this._gridLoc) && this._biteStart == null) {
      this._moving = false;
      this._loc = this._map.turtle.location;
      this._biteStart = (new Date()).getTime();
      this._map.turtle.stop();
    } else if (this._biteStart != null) {
      if (this._map.turtle.isAlive() && this.time > BITE_DURATION/2) {
        this._map.turtle.die();
      } else if (this.time > BITE_DURATION) {
        this._biteStart = null;
        this._moving = true;
        this._loc = this._gridLoc;
      }
    } else if (tile.isTraversible() && !tile.isSlippery()) {
      this.moveForward();
    } else {
      this._direction = this._direction.opposite;
    }
  }

  get image() {
    if (this._moving) {
      return this._image;
    } else {
      return BITING_IMG;
    }
  }

  get time() {
    if (this._biteStart == null) {
      return 0;
    } else {
      return (new Date()).getTime() - this._biteStart;
    }
  }

}
