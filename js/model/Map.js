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
    if (Math.floor(x) == x && Math.floor(y) == y)
      return this._grid[y][x];
    throw "(" + x + "," + y + ") is not valid";
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
        this._grid[y].push(new Wall(x, y));
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
   * @param {string} fileName
   * @return {Map}
   */
  static loadFromFile(fileName) {
    var file = new File([""], fileName);
    var textByLine = file.getAsText().split("\n");
    var height = textByLine.length;
    var width = textByLine[0].length;

    var myMap = new Map(width, height);
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        setTile(Tile.createTile(x,y,textByLine[y][x]));
      }
    }
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
