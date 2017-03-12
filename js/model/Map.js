var LEVEL_1 = [
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "w ttTtt w     w   w       ttttw",
  "w wwwww w w w w           wwwtw",
  "w     w   w w              wwtw",
  "wwwww wwwww www              tw",
  "wTtttttttT    w  w           tw",
  "wtwwwwwwwtw w w           wwwtw",
  "wTtttttttTw w w     w     wwwtw",
  "wwwwwwwwwww w wwwwwww wwwwwwwtw",
  "w    wttttw   w       w     w w",
  "w w    wwtw   w       w www w w",
  "w w  w  wtw   w        tTtw w w",
  "w w     wTw   w       wTtTw w w",
  "w wTw   www   w       wwwww w w",
  "w wwwwwww                   w w",
  "w   w   w w   w    wwwwwwwwww w",
  "w w w w w w   ww              w",
  "w w   w   w                   w",
  "wwwwwwwwwww w   wwwwwwwwwwwwwww",
  "wTtttttTww  wwwwwtttttttttttttw",
  "wtwwwwwtw               w   w w",
  "wtwTtttTw               w     w",
  "wtwwwwwww    WWWwww           w",
  "wTttttttt    WWWwww           w",
  "wwwwwwwww                     w",
  "w                             w",
  "w wwwwwww w w w w w      w    w",
  "w       w w w     w          ww",
  "wwwwwww www w www wt   w     tw",
  "wTttttt     w     wtttttttttttw",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
];

var LEVEL_2 = [
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "w                     wwww    w",
  "w wwwwwwwwwwwwwwwwwww    w ww w",
  "w w                 wwww wwww w",
  "w w wwwwwwwwwwwwwww ww        w",
  "w w w             w w  w      w",
  "w w w wwwwwwwwwww w w      wwww",
  "w w w     w     w w w         w",
  "w w wwwwwwwwwww w w ww     ww w",
  "w w             w w w       w w",
  "w wwwwwwwwwwwwwww w w     w   w",
  "w                 w w      wwww",
  "wwwwwwwwwwwwwwwwwww wwwwww wwww",
  "w     w     w   w             w",
  "w www w www w w w        w    w",
  "w w w w w   w w w   w         w",
  "w w w   w w   wWw           w w",
  "w w w www   wwWWWw      w     w",
  "w w w w   wwwWWWWWw           w",
  "w w w w w wwWWWWWWWw       w  w",
  "w w w w   wWWWWWWWWWwww       w",
  "w w w w wwWWWWWWWWWWW         w",
  "w w w w wWWWWWWWWWWWWWw   ww ww",
  "w w   wwWWWWWWWWWWWWWWWw   w ww",
  "w wwwwwWWWWWWWWWWWWWWWWWw    ww",
  "w   wwWWWWWWWWWWWWWWWWWWWw   ww",
  "www                          ww",
  "w wwWWWWWW           WWWWw ww w",
  "w wWWWWWWW  w www w  WWWWw  w w",
  "wWWWWWWWWW  w     w  WWWWWW   w",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
];

class Map {

  /**
   * Builds the map object to the specified height and width
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    this._width = width;
    this._height = height;
    this._grid = [];
    this._turtle = new Turtle(Math.floor(this._width/2), 1, this);
    //this._turtle = new Turtle(0, 0, this);

    this.buildGrid();
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get turtle() {
    return this._turtle;
  }

  /**
   * Gets the tile at the given location
   * @param {number} x
   * @param {number} y
   * @return {Tile}
   */
  getTile(x, y) {
    if (Math.floor(x) == x && Math.floor(y) == y) {
      if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
        return this._grid[y][x];
      } else {
        return new Ice(x,y);
      }
    }
    throw "x and y coordinates must be integers";
  }

  /**
   * Gets the tile at the given location
   * @param {Tile} tile
   */
  setTile(tile) {
    this._grid[tile.location.y][tile.location.x] = tile;
  }

  /**
   * Builds the grid of the Map
   */
  buildGrid() {
    for (var y = 0; y < this._height; y++) {
      this._grid.push([]);
      for (var x = 0; x < this._width; x++) {
        this._grid[y].push(new SnowWall(x, y));
      }
    }
  }

  /**
   * Prints the map to the console
   * @return {string}
   */
  toString() {
    var output = "";
    for (var y = this._height - 1; y >= 0; y--) {
      var line = "";
      for (var x = 0; x < this._width; x++) {
        if (this.turtle.getLocation().x == x && this.turtle.getLocation().y == y) {
          line += "m";
        } else {
          line += this.getTile(x,y).toString();
        }
      }
      output += line + "\n";
    }
    return output;
  }

  /**
   * Loads a map object from the file (fileName)
   * @param {Array} lines
   * @return {Map}
   */
  static loadFromString(lines) {
    var height = lines.length;
    var width = lines[0].length;

    var myMap = new Map(width, height);
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        myMap.setTile(Tile.createTile(x,y,lines[height - y - 1][x]));
      }
    }

    return myMap;
  }

}

class BaseMap extends Map {

  constructor() {
    super(15, 15);

    this.clearInit();
  }

  /**
   * Clears the map on initialization
   */
  clearInit() {
    for (var x = 1; x < this._width - 1; x++) {
      for (var y = 1; y < this._height - 1; y++) {
        this.setTile(new Space(x,y));
      }
    }
  }

}
