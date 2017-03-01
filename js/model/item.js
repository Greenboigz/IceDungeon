var TOKEN = 0, BIG_TOKEN = 1;

class Item {

  /**
   * Builds the item object
   * @param {number} points
   * @param {number} coins
   * @param {string} image
   */
  constructor(points, coins, image) {
    this._pointValue = points;
    this._coinValue = coins;
    this._image = image;
  }

  /**
   * Gets the point value of the item
   * @return {number}
   */
  get points() {
    return this._pointValue;
  }

  /**
   * Gets the coin value of the item
   * @return {number}
   */
  get coins() {
    return this._coinValue;
  }

  /**
   * Gets the image name associated to the item
   * @return {string}
   */
  get image() {
    return this._image;
  }

}

class Token extends Item {

  /**
   * Builds the token object
   * @param {number} points
   * @param {number} coins
   * @param {string} image
   */
  constructor() {
    super(1, 0, "token");
  }

}

class BigToken extends Item {

  /**
   * Builds the big token object
   * @param {number} points
   * @param {number} coins
   * @param {string} image
   */
  constructor(x, y) {
    super(10, 0, "bigtoken");
  }

}

class Coin extends Item {

  /**
   * Builds the big token object
   * @param {number} points
   * @param {number} coins
   * @param {string} image
   */
  constructor(x, y) {
    super(0, 1, "bigtoken");
  }

}
