var map, protagonist, view, keypadListener, loaded = 0;
var INIT_RELOAD = 500, RELOAD = 5, DIV_SIZE = 8, PIXELS_PER_DIV = 32;

var handlerIncludes = ["js/handlers/KeypadListener.js",
  "js/handlers/MoveHandler.js"];
var mathIncludes = ["js/math/Direction.js",
  "js/math/Vector.js"];
var modelIncludes = ["js/model/enemy/Enemy.js", "js/model/enemy/Shark.js",
  "js/model/items/Item.js", "js/model/items/Key.js",
  "js/model/map/Tile.js", "js/model/map/Door.js", "js/model/map/Level.js", "js/model/map/Map.js",
  "js/model/protagonist/Protagonist.js", "js/model/protagonist/Penguin.js", "js/model/protagonist/Turtle.js"];
var viewIncludes = ["js/view/ImageHandler.js",
  "js/view/View.js"];

var includes = [];
includes = includes.concat(handlerIncludes);
includes = includes.concat(mathIncludes);
includes = includes.concat(modelIncludes);
includes = includes.concat(viewIncludes);

var tileInclude = "../maps/map_1/TileMap.txt";
var itemInclude = "../maps/map_1/ItemMap.txt";
var enemyInclude = "../maps/map_1/Enemies.json";

var tile_map = null;
var item_map = null;
var enemies_list = null;

/**
 * Loads the Javascript files
 * @param {string} url 
 * @param {function} callback 
 */
function loadScript(url, callback) {
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

/**
 * Reads the text file specified by the file string and the 
 * @param {string} file URL path to the file
 * @param {function} onSuccess function called when the file is successfully read
 */
function readTextFile(file, onSuccess) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        onSuccess(allText);
      }
    }
  }
  rawFile.send(null);
}

/**
 * Reads the text file specified by the file string and the 
 * @param {string} file URL path to the file
 * @param {function} onSuccess function called when the file is successfully read
 */
function readJSONFile(file, onSuccess) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        onSuccess(JSON.parse(allText));
      }
    }
  }
  rawFile.send(null);
}

function loadCallback(name) {
  loaded++;
  console.log(name + " loaded\n");
  if (loaded >= includes.length && tile_map && item_map && enemies_list) {
    setTimeout(() => { 
      init(tile_map, item_map, enemies_list); 
      repeat(); 
    }, INIT_RELOAD);
  }
}

function load_files() {
  var i;

  for (i = 0; i < includes.length; i++) {
    loadScript(includes[i], loadCallback(includes[i]));
  }
}

function load_map(tileInclude, itemInclude, enemyInclude) {
  readTextFile(tileInclude, (map) => { tile_map = map; });
  readTextFile(itemInclude, (map) => { item_map = map; });
  readJSONFile(enemyInclude, (json) => { enemies_list = json.enemies; });
}

function print(param) {
  console.log("param = " + param);
}

/**
 * Loads the map from the provided init objects
 * @param {string} tile_map 
 * @param {string} token_map 
 * @param {[*]} enemies_list
 */
function init(tile_map, token_map, enemies_list) {
  map = Map.loadFromString(tile_map, token_map, enemies_list);
  protagonist = new Penguin(Math.floor(map._width / 2), 1, map);
  map._protagonist = protagonist;
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
  view.draw();
  modelRepeat();
  setTimeout(repeat, RELOAD);
}

function modelRepeat() {
  protagonist.move();
  for (var e = 0; e < enemies.length; e++) {
    enemies[e].move();
  }
}

load_map(tileInclude, itemInclude, enemyInclude);
load_files();
