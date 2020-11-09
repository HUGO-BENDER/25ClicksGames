export interface BoardGame {
  cols: number;
  rows: number;
  tiles: Array<Tile>;
  // tilesRows: Array<Array<Tile>>;
}

export interface Tile {
  // idPlayer: string;
  // displayNamePlayer: string;
  id: number;
  description: string;
  dragEnable?: boolean;
  classCss?: any;
  previousValues?: Tile;
}
