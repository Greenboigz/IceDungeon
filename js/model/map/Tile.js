TILE_LETTERS = ["W"," ","w"];

class Tile {

  /**
   * Abstract class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   * @param {number} type
   * @param {string} string
   * @param {string} image
   */
  constructor(x, y, type, string, image) {
    this._loc = new Vector(x,y);
    this._type = type;
    this._string = string;
    this._image = image;

    this._item = null;
    this._hasItem = false;
    this._storable = false;
    this._traversible = false;
    this._slippery = false;
    this._interrupting = false;
    this._walkable = false;
    this._deadly = false;

    this._prevState = null;
  }

  /**
   * Gets the string representation
   * @return {string}
   */
  toString() {
    return this._string;
  }

  /**
   * Gets the type of the tile
   * @return {number}
   */
  get type() {
    return this._type;
  }

  /**
   * Gets the vector of the location of the tile
   * @return {Vector}
   */
  get location() {
    return new Vector(this._loc.x, this._loc.y)
  }

  /**
   * Gets the image name of the tile
   * @return {string}
   */
  get image() {
    return this._image;
  }

  /**
   * Gets the item on the tile
   * @return {Item}
   */
  get item() {
    if (this._hasItem) {
      return this._item;
    }
  }

  /**
   * Saves the current state of the tile
   */
  storeState() {
    if (this._prevState == null) {
      this._prevState = this.copy();
    }
  }

  /**
   * Restores the previous state of the tile
   */
  restoreState() {
    if (this._prevState != null) {
      this._type = this._prevState._type;
      this._string = this._prevState._string;
      this._image = this._prevState._image;

      this._item = this._prevState._item;
      this._hasItem = this._prevState._hasItem;
      this._storable = this._prevState._storable;
      this._traversible = this._prevState._traversible;
      this._slippery = this._prevState._slippery;
      this._interrupting = this._prevState._interrupting;
      this._walkable = this._prevState._walkable;
      this._deadly = this._prevState._deadly;

      this._prevState = null;
    }
  }

  /**
   * CLear stored state
   */
  clearStored() {
    this._prevState = null;
  }

  /**
   * Sets the item associated to the tile
   * @param {Item} item
   */
  set item(item) {
    if (this.isStorable() && !this._hasItem && item != null) {
      this._item = item;
      this._hasItem = true;
    } else if (!this.isStorable()) {
      throw "This tile cannot store items";
    }
  }

  /**
   * Removes the item from the tile
   * @return {Item}
   */
  removeItem() {
    if (this.hasItem()) {
      var item = this._item;
      this._item = null;
      this._hasItem = false;
      return item;
    }
  }

  /**
   * Checks if the tile is storing an item
   * @return {boolean}
   */
  hasItem() {
    return this._hasItem;
  }

  /**
   * Checks if the tile can store items
   * @return {boolean}
   */
  isStorable() {
    return this._storable;
  }

  /**
   * Checks if the tile is slippery
   * @return {boolean}
   */
   isSlippery() {
     return this._slippery;
   }

  /**
   * Checks if the tile is traversible
   * @return {boolean}
   */
   isTraversible() {
     return this._traversible;
   }

   /**
    * Checks if the skaters is stopped after traversing
    * @return {boolean}
    */
   isInterrupting() {
     return this._interrupting;
   }

   /**
    * Checks if the tile is walkable
    * @return {boolean}
    */
   isWalkable() {
     return this._walkable;
   }

   /**
    * Copies the tile to the new coordinates
    * @param {Number} x
    * @param {Number} y
    * @return {Tile}
    */
   copy(x, y) {
     var tile = Tile.createTile(x, y, this._string);
     if (this.hasItem()) {
       tile._item = this._item.copy();
     }
     return tile;
   }

   /**
    * Checks if the block is deadly
    * @return {boolean}
    */
    isDeadly() {
      return this._deadly;
    }

    /**
     * Compares the type values of tiles
     * @param {Tile} tile1
     * @param {Tile} tile2
     * @return {boolean}
     */
    static compare(tile1, tile2) {
      return tile1._type == tile2._type;
    }

    /**
     * Creates a tile from the provided information
     * @param {number} x
     * @param {number} y
     * @param {string} type
     * @return {Tile}
     */
    static createTile(x, y, type) {
      var tile;
      switch (type) {
        case 'w':
          tile = new SnowWall(x, y);
          break;
        case ' ':
          tile = new Ice(x, y);
          break;
        case 'W':
          tile = new Water(x,y);
          break;
        case 's':
          tile = new Spike(x, y);
          break;
        case 'b':
          tile = new Barrier(x, y);
          break;
        default:
          tile = new Ice(x, y);
      }

      return tile;
    }

}


class SnowWall extends Tile {

  /**
   * Wall class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 0, "w", "snow");
  }

}

class Ice extends Tile {

  /**
   * Space class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 1, " ", "ice");
    this._traversible = true;
    this._storable = true;
    this._slippery = true;
  }

}

class Water extends Tile {

  /**
   * Space class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 2, "W", "water");
    this._traversible = true;
    this._storable = true;
  }

}

class Spike extends Tile {

  /**
   * Spike class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 3, "s", "spike");
    this._interrupting = true;
    this._traversible = true;
    this._storable = true;
    this._deadly = true;
  }

}

class Barrier extends Tile {

  /**
   * Barrier class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 4, "b", "barrier");
    this._interrupting = true;
    this._traversible = true;
    this._walkable = true;
  }

  /**
   * Gets the image name of the tile
   * @return {string}
   */
  get image() {
    return "barrier";
  }

}
