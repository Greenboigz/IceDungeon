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
    this.protagonist = map.protagonist;
    this.enemies = map.enemies;
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
    this.imageHandler.loadImage("penguin", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("penguin_sliding", 2, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("penguin_stationary", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("swimming_penguin", 2, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("swimming_penguin_stationary", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("token", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("big_token", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("black_token", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("big_black_token", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("star", 2, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("blue_key", 2, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("gold_key", 2, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("green_key", 2, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("navy_key", 2, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("purple_key", 2, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("red_key", 2, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("shark", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("attacking_shark", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("ice", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("snow", 1, PIXELS_PER_DIV, PIXELS_PER_DIV);
    this.imageHandler.loadImage("water", 8, PIXELS_PER_DIV, PIXELS_PER_DIV);
  }

  /**
   * Draws the canvas
   */
  draw() {
    this.drawMap();
    this.drawProtagonist();
    this.drawEnemies();
  }

  /**
   * Draws the enemies
   */
  drawEnemies() {
    for (var enemy in this.enemies) {
      var location = Vector.add(tile.location, Vector.subtract(center, Protagonist.location));
      this.imageHandler.drawImage(tile.image, location.x * PIXELS_PER_DIV, (DISPLAY_DIM - location.y) * PIXELS_PER_DIV, 0);
      if (tile.hasItem()) {
        this.imageHandler.drawImage(tile.item.image, location.x * PIXELS_PER_DIV, (DISPLAY_DIM - location.y) * PIXELS_PER_DIV, 0);
      }
    }
  }

  /**
   * Draws the Protagonist
   */
  drawProtagonist() {
    this.imageHandler.drawImage(this.protagonist.image, this.protagonist.location.x * PIXELS_PER_DIV,
      (this.map.height - this.protagonist.location.y - 1) * PIXELS_PER_DIV,
      this.protagonist.direction.radians);
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
   * Only draws the board surrounding the protagonist
   */
  drawLocal() {
    this.drawLocalMap();
    this.drawLocalEnemies();
    this.drawLocalProtagonist();
    this.drawBorder();
  }

  /**
   * Draws local map of where the protagonist is
   */
  drawLocalMap() {
    var i, j;
    var center = new Vector(Math.floor(DISPLAY_DIM/2)+1, Math.floor(DISPLAY_DIM/2));
    for (i = -1; i < DISPLAY_DIM+2; i++) {
      for (j = -1; j < DISPLAY_DIM+2; j++) {
        var tile = this.map.getTile(i - center.x + protagonist.gridLocation.x, j - center.y + protagonist.gridLocation.y);
        var location = Vector.add(tile.location, Vector.subtract(center, protagonist.location));
        this.imageHandler.drawImage(tile.image, location.x * PIXELS_PER_DIV, (DISPLAY_DIM - location.y) * PIXELS_PER_DIV, 0);
        if (tile.hasItem()) {
          this.imageHandler.drawImage(tile.item.image, location.x * PIXELS_PER_DIV, (DISPLAY_DIM - location.y) * PIXELS_PER_DIV, 0);
        }
      }
    }
  }

  drawLocalProtagonist() {
    if (this.protagonist.isAlive()) {
      this.imageHandler.drawImage(this.protagonist.image, Math.floor(DISPLAY_DIM/2 + 1) * PIXELS_PER_DIV,
        Math.floor(DISPLAY_DIM/2 + 1) * PIXELS_PER_DIV, this.protagonist.direction.radians);
    }
  }

  /**
   * Draws the enemies
   */
  drawLocalEnemies() {
    var center = new Vector(Math.floor(DISPLAY_DIM/2)+1, Math.floor(DISPLAY_DIM/2));
    for (var e = 0; e < this.enemies.length; e++) {
      var enemy = this.enemies[e];
      var location = Vector.add(enemy.location, Vector.subtract(center, protagonist.location));
      this.imageHandler.drawSpriteImage(enemy.image, location.x * PIXELS_PER_DIV,
        (DISPLAY_DIM - location.y) * PIXELS_PER_DIV, enemy.direction.radians,
        enemy.time);
    }
  }

  drawBorder() {
    this.ctx.beginPath();
    this.ctx.lineWidth=PIXELS_PER_DIV;
    this.ctx.strokeStyle="black";
    this.ctx.rect(PIXELS_PER_DIV/2,PIXELS_PER_DIV/2,(DISPLAY_DIM+1) * PIXELS_PER_DIV, (DISPLAY_DIM+1) * PIXELS_PER_DIV);
    this.ctx.stroke();
  }

}
