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

  /**
   * Creates an item from the associated string
   * @param {string} string
   * @return {Item}
   */
  static createItem(string) {
    var item;
    switch (string) {
      case 'b':
        item = new BlackToken();
        break;
      case 'B':
        item = new BigBlackToken();
        break;
      case 't':
        item = new Token();
        break;
      case 'T':
        item = new BigToken();
        break;
      default:
        item = null;
    }
    return item;
  }


}

class Token extends Item {

  /**
   * Builds the token object
   */
  constructor() {
    super(1, 0, "token");
  }

}

class BigToken extends Item {

  /**
   * Builds the big token object
   */
  constructor() {
    super(10, 0, "big_token");
  }

}

class BlackToken extends Item {

  /**
   * Builds the black token object
   */
  constructor() {
    super(1, 0, "black_token");
  }

}

class BigBlackToken extends Item {

  /**
   * Builds the big black token object
   */
  constructor() {
    super(10, 0, "big_black_token");
  }

}

class Money extends Item {

  /**
   * Builds the money object
   */
  constructor(x, y) {
    super(0, 1, "money");
  }

}
