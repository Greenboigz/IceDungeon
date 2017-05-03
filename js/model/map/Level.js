class Level {

  /**
   * Constructor for the level object
   * @param {Array} map
   * @param {Array} token_map
   * @param {Array} enemies
   */
  constructor(map, token_map, enemies) {
    this._map = Map.loadFromString(map, token_map, enemies);
    this._turtle = this._map.turtle;
  }

}
