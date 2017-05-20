/**
 * This is the main character of the game
 */
class Builder extends Protagonist {

  /**
   * Turtle object that traverse the Map
   * @param {number} x
   * @param {number} y
   * @param {number} grid
   */
  constructor(x, y, grid) {
    super(x, y, grid);
    this._editing = false;
    this.findTile();

    this._highlighting = false;
    this._highlightBase = null;

    this._dragging = false;
    this._dragBase = null;
  }

  /**
   * Turns the turtle in the correct direction and starts
   * @param {Direction} direction
   */
  turn(direction) {
    var temp = Vector.add(this._gridLoc, direction.toVector());
    if (this._grid.isValidLocation(temp.x, temp.y)) {
      this._gridLoc = temp;
      this._loc = temp;
      this.findTile();
      this.highlightTiles();
      this.dragTiles();
    } else {
      console.log("Turn Failed");
    }
  }

  /**
   * Drags the tiles with the given drag base tile
   */
  dragTiles() {
    if (this._dragging) {
      this._grid.setTile(this._grid.getTile(
        this._dragBase.x, this._dragBase.y
      ).copy(this._gridLoc.x, this._gridLoc.y));
    }
  }

  /**
   * Highlights the tiles with the given highlight base tile
   */
  highlightTiles() {
    if (this._highlighting) {
      var x1 = Math.min(this._highlightBase.x, this._gridLoc.x);
      var x2 = Math.max(this._highlightBase.x, this._gridLoc.x);
      var y1 = Math.min(this._highlightBase.y, this._gridLoc.y);
      var y2 = Math.max(this._highlightBase.y, this._gridLoc.y);
      for (var x = 0; x <= this._grid.width; x++) {
        for (var y = 0; y <= this._grid.height; y++) {
          if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
            this._grid.getTile(x,y).storeState();
            this._grid.setTile(this._grid.getTile(
              this._highlightBase.x,
              this._highlightBase.y
            ).copy(x,y));
          } else {
            this._grid.getTile(x,y).restoreState();
          }
        }
      }
    }
  }

  /**
   * Handles the button release for the turtle
   * @param {Direction} direction
   */
  unturn(direction) {

  }

  /**
   * Moves the builder forward if it can
   */
  move() {

  }

  /**
   * Causes the protagonist to perform its special move
   */
  special() {
    if (!this._highlighting) {
      this._editing = !this._editing;
    }
  }

  unspecial() {

  }

  /**
   * Turns on the highlighter function
   */
  highlight() {
    if (this._editing && !this._dragging) {
      this._highlighting = true;
      this._highlightBase = this._gridLoc.copy();
    }
  }

  /**
   * Turns off the highlighter function
   */
  unhighlight() {
    if (this._highlighting) {
      for (var x = 0; x <= this._grid.width; x++) {
        for (var y = 0; y <= this._grid.height; y++) {
          this._grid.getTile(x,y).clearStored();
        }
      }
      this._highlighting = false;
      this._highlightBase = null;
    }
  }

  /**
   * Turns on the dragging function
   */
  drag() {
    if (this._editing && !this._highlighting) {
      this._dragging = true;
      this._dragBase = this._gridLoc.copy();
    }
  }

  /**
   * Turns off the dragging function
   */
  undrag() {
    if (this._dragging) {
      this._dragging = false;
      this._dragBase = null;
    }
  }

  /**
   * Finds the current tile string that the builder is resting on
   */
  findTile() {
    this._tile = -1;
    var tile = this._grid.getTile(this._gridLoc.x, this._gridLoc.y);
    for (var t = 0; t < TILE_LETTERS.length; t++) {
      if (TILE_LETTERS[t] == tile) {
        this._tile = t;
      }
    }
    if (this._tile == -1) {
      throw "Tile is not a valid tile at index " + this._gridLoc.toString();
    }
  }

  /**
   * Cycles through the tiles by changing the index by dif
   * @param {Number} dif
   */
  changeTile(dif) {
    if (this._editing) {
      this._tile = (this._tile + dif) % TILE_LETTERS.length;
      if (this._tile < 0) {
        this._tile += 3;
      }
      this.map.setTile(Tile.createTile(this._gridLoc.x, this._gridLoc.y, TILE_LETTERS[this._tile]));
    }
  }

  /**
   * Sets the tile to the value specified
   * @param {Number} value
   */
  setTile(value) {
    if (this._editing) {
      this._tile = value % TILE_LETTERS.length;
      if (this._tile < 0) {
        this._tile += 3;
      }
      this.map.setTile(Tile.createTile(this._gridLoc.x, this._gridLoc.y, TILE_LETTERS[this._tile]));
    }
  }

  /**
  * Gets the name of the image associated with the turtle
  * @return {string}
  */
  get image() {
    if (this._editing) {
      return "editor";
    } else {
      return "builder";
    }
  }

}
