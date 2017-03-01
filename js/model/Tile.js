class Tile {

  /**
   * Abstract class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   * @param {number} type
   * @param {string} string
   */
  constructor(x, y, type, string) {
    this._loc = new Vector(x,y);
    this._type = type;
    this._string = string;
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
    throw "Not Implemented";
  }

  /**
   * Checks if the tile is traversible
   * @return {boolean}
   */
   isTraversible() {
     throw "isTraversible method not implemented";
   }

   /**
    * Checks if the skaters is stopped after traversing
    * @return {boolean}
    */
   isInterrupting() {
     throw "isInterrupting method not implemented";
   }

   /**
    * Checks if the block is deadly
    * @return {boolean}
    */
    isDeadly() {
      throw "isDeadly method not implemented";
    }

    /**
     * Creates a tile from the provided information
     * @param {number} x
     * @param {number} y
     * @param {string} character
     * @return {Tile}
     */
    static createTile(x, y, character) {
      switch (character) {
        case 'w':
          return new Wall(x, y);
          break;
        case ' ':
          return new Space(x, y);
          break;
        case 's':
          return new Spike(x, y);
          break;
        case 'b':
          return new Barrier(x, y);
          break;
        default:
          return new Space(x, y);
      }
    }

}

class Wall extends Tile {

  /**
   * Wall class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 0, "w");
  }

  /**
   * Gets the image name of the tile
   * @return {string}
   */
  get image() {
    return "wall";
  }

  /**
   * Checks if the tile is traversible
   * @return {boolean}
   */
   isTraversible() {
     return false;
   }

   /**
    * Checks if the skaters is stopped after traversing
    * @return {boolean}
    */
   isInterrupting() {
     return false;
   }

   /**
    * Checks if the block is deadly
    * @return {boolean}
    */
    isDeadly() {
      return false;
    }

}

class Space extends Tile {

  /**
   * Space class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 1, " ");
  }

  /**
   * Gets the image name of the tile
   * @return {string}
   */
  get image() {
    return "space";
  }

  /**
   * Checks if the tile is traversible
   * @return {boolean}
   */
   isTraversible() {
     return true;
   }

   /**
    * Checks if the skaters is stopped after traversing
    * @return {boolean}
    */
   isInterrupting() {
     return false;
   }

   /**
    * Checks if the block is deadly
    * @return {boolean}
    */
    isDeadly() {
      return false;
    }

}

class Spike extends Tile {

  /**
   * Spike class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 2, "s");
  }

  /**
   * Gets the image name of the tile
   * @return {string}
   */
  get image() {
    return "spike";
  }

  /**
   * Checks if the tile is traversible
   * @return {boolean}
   */
   isTraversible() {
     return true;
   }

   /**
    * Checks if the skaters is stopped after traversing
    * @return {boolean}
    */
   isInterrupting() {
     return true;
   }

   /**
    * Checks if the block is deadly
    * @return {boolean}
    */
    isDeadly() {
      return true;
    }

}

class Barrier extends Tile {

  /**
   * Barrier class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 3, "b");
  }

  /**
   * Gets the image name of the tile
   * @return {string}
   */
  get image() {
    return "barrier";
  }

  /**
   * Checks if the tile is traversible
   * @return {boolean}
   */
   isTraversible() {
     return true;
   }

   /**
    * Checks if the skaters is stopped after traversing
    * @return {boolean}
    */
   isInterrupting() {
     return false;
   }

   /**
    * Checks if the block is deadly
    * @return {boolean}
    */
    isDeadly() {
      return true;
    }

}
