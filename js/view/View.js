var PIXELS_PER_DIV = 32;
var IMAGE_FILES = ["wall", "space", "barrier", "turtle1", "turtle2"];

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
    this.imageHandler.drawImage("turtle", this.turtle.location.x * PIXELS_PER_DIV,
      (this.map.height - this.turtle.location.y) * PIXELS_PER_DIV,
      this.turtle.direction.radians);
  }

  /**
   * Draws the map
   */
  drawMap() {
    var x, y;
    for (x = 0; x < this.map.width; x++) {
      for (y = 0; y < this.map.height; y++) {
        this.imageHandler.drawImage(this.map.getTile(x,y).image, x * PIXELS_PER_DIV, (this.map.height - y - 1) * PIXELS_PER_DIV, 0);
      }
    }
  }

}
