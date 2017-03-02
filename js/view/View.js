var PIXELS_PER_DIV = 32;

class View {

  /**
   * Constructs the View object
   * @param {Map} map
   */
  constructor(map) {
    var canvas = document.createElement("canvas");
    canvas.width = map.width*PIXELS_PER_DIV;
    canvas.height = map.height*PIXELS_PER_DIV;

    this.ctx = canvas.getContext("2d");
    this.map = map;
    this.turtle = map.turtle;
    this.IMAGES = {};
    this.divImg = document.getElementById("divGameImg");

    var div = document.getElementById("divGameStage");
    if (div.childNodes[0]) {
      div.removeChild(div.childNodes[0]);
    }
    div.appendChild(canvas);

    this.imageHandler = new ImageHandler(this.ctx);
    this.loadImages();
  }

  /**
   * Loads all the images in the image div
   */
  loadImages() {
    this.imageHandler.loadImage("wall", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("space", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("turtle", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("turtle_hidden", 2, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("token", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("big_token", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("black_token", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("big_black_token", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
  }

  /**
   * Draws the canvas
   */
  draw() {
    view.drawMap();
    this.drawTurtle();
  }

  /**
   * Draws the Turtle
   */
  drawTurtle() {
    this.imageHandler.drawImage(this.turtle.image, this.turtle.location.x * PIXELS_PER_DIV,
      (this.map.height - this.turtle.location.y - 1) * PIXELS_PER_DIV,
      this.turtle.direction.radians);
  }

  /**
   * Draws the map
   */
  drawMap() {
    var x, y;
    for (x = 0; x < this.map.width; x++) {
      for (y = 0; y < this.map.height; y++) {
        var tile = this.map.getTile(x,y)
        this.imageHandler.drawImage(tile.image, x * PIXELS_PER_DIV, (this.map.height - y - 1) * PIXELS_PER_DIV, 0);
        if (tile.hasItem()) {
          this.imageHandler.drawImage(tile.item.image, x * PIXELS_PER_DIV, (this.map.height - y - 1) * PIXELS_PER_DIV, 0);
        }
      }
    }
  }

}
