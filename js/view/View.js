var PIXELS_PER_DIV = 32;
var DISPLAY_DIM = 15;

class View {

  /**
   * Constructs the View object
   * @param {Map} map
   */
  constructor(map) {
    var canvas = document.createElement("canvas");
    canvas.width = (DISPLAY_DIM+2)*PIXELS_PER_DIV;
    canvas.height = (DISPLAY_DIM+2)*PIXELS_PER_DIV;

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
    this.imageHandler.loadImage("turtle_stationary", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("swimming_turtle", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("swimming_turtle_hidden", 2, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("swimming_turtle_stationary", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("token", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("big_token", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("black_token", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("big_black_token", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("ice", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("snow", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("water", 8, PIXELS_PER_DIV, PIXELS_PER_DIV);
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

  /**
   * Only draws the board surrounding the turtle
   */
  drawLocal() {
    this.drawLocalMap();
    this.drawLocalTurtle();
    this.drawBorder();
  }

  /**
   * Draws local map of where the turtle is
   */
  drawLocalMap() {
    var i, j;
    var center = new Vector(Math.floor(DISPLAY_DIM/2)+1, Math.floor(DISPLAY_DIM/2));
    for (i = -1; i < DISPLAY_DIM+2; i++) {
      for (j = -1; j < DISPLAY_DIM+2; j++) {
        var tile = this.map.getTile(i - center.x + turtle.gridLocation.x, j - center.y + turtle.gridLocation.y);
        var location = Vector.add(tile.location, Vector.subtract(center, turtle.location));
        this.imageHandler.drawImage(tile.image, location.x * PIXELS_PER_DIV, (DISPLAY_DIM - location.y) * PIXELS_PER_DIV, 0);
        if (tile.hasItem()) {
          this.imageHandler.drawImage(tile.item.image, location.x * PIXELS_PER_DIV, (DISPLAY_DIM - location.y) * PIXELS_PER_DIV, 0);
        }
      }
    }
  }

  drawLocalTurtle() {
    this.imageHandler.drawImage(this.turtle.image, Math.floor(DISPLAY_DIM/2 + 1) * PIXELS_PER_DIV,
      Math.floor(DISPLAY_DIM/2 + 1) * PIXELS_PER_DIV, this.turtle.direction.radians);
  }

  drawBorder() {
    this.ctx.beginPath();
    this.ctx.lineWidth=PIXELS_PER_DIV;
    this.ctx.strokeStyle="black";
    this.ctx.rect(PIXELS_PER_DIV/2,PIXELS_PER_DIV/2,(DISPLAY_DIM+1) * PIXELS_PER_DIV, (DISPLAY_DIM+1) * PIXELS_PER_DIV);
    this.ctx.stroke();
  }

}
