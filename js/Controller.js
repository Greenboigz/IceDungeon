var map, protagonist, view, keypadListener, loaded = 0;
var INIT_RELOAD = 100, RELOAD = 5, DIV_SIZE = 8, PIXELS_PER_DIV = 32;
var includes = ["js/math/Vector.js", "js/math/Direction.js", "js/model/Map.js",
                "js/model/Tile.js", "js/model/Protagonist.js", "js/model/Turtle.js",
                "js/model/Penguin.js", "js/model/Item.js",
                "js/view/View.js", "js/KeypadListener.js", "js/view/ImageHandler.js",
                "js/model/MoveHandler.js", "js/model/Enemy.js", "js/model/Shark.js",
                "js/model/Key.js", "js/model/Door.js"];

function loadScript(url, callback)
{
  // Adding the script tag to the head as suggested before
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;
  script.async = false;

  // Fire the loading
  head.appendChild(script);
}

function loadCallback(name) {
  loaded++;
  console.log(name + " loaded\n");
  if (loaded >= includes.length) {
    setTimeout(function() { init(); repeat(); }, INIT_RELOAD);
  }
}

function load_files() {
  var i;

  for (i = 0; i < includes.length; i++) {
    loadScript(includes[i], loadCallback(includes[i]));
  }
}

function print(param) {
  console.log("param = " + param);
}

function init() {
  map = Map.loadFromString(MAP_2, TOKEN_2, ENEMIES_2);
  protagonist = map.protagonist;
  enemies = map.enemies;
  view = new View(this.map);

  keypadListener = new KeypadListener();
  keypadListener.addKeyListener("space", 32);

  keypadListener.getKeyListener("up").addKeyDownEvent(callDownNorth);
  keypadListener.getKeyListener("right").addKeyDownEvent(callDownEast);
  keypadListener.getKeyListener("down").addKeyDownEvent(callDownSouth);
  keypadListener.getKeyListener("left").addKeyDownEvent(callDownWest);
  keypadListener.getKeyListener("up").addKeyUpEvent(callUpNorth);
  keypadListener.getKeyListener("right").addKeyUpEvent(callUpEast);
  keypadListener.getKeyListener("down").addKeyUpEvent(callUpSouth);
  keypadListener.getKeyListener("left").addKeyUpEvent(callUpWest);
  keypadListener.getKeyListener("space").addKeyDownEvent(callSpecial);
  keypadListener.getKeyListener("space").addKeyUpEvent(callUnspecial);
}

function callDownNorth() {
  protagonist.turn(Direction.NORTH());
}

function callDownEast() {
  protagonist.turn(Direction.EAST());
}

function callDownSouth() {
  protagonist.turn(Direction.SOUTH());
}

function callDownWest() {
  protagonist.turn(Direction.WEST());
}

function callUpNorth() {
  protagonist.unturn(Direction.NORTH());
}

function callUpEast() {
  protagonist.unturn(Direction.EAST());
}

function callUpSouth() {
  protagonist.unturn(Direction.SOUTH());
}

function callUpWest() {
  protagonist.unturn(Direction.WEST());
}

function callSpecial() {
  protagonist.special();
}

function callUnspecial() {
  protagonist.unspecial();
}

function repeat() {
  //document.getElementById("divGameStage").innerHTML = map.toString();
  view.drawLocal();
  modelRepeat();
  setTimeout(repeat, RELOAD);
}

function modelRepeat() {
  protagonist.move();
  for (var e = 0; e < enemies.length; e++) {
    enemies[e].move();
  }
}

load_files();
