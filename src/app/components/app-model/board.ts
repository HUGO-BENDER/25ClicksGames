export interface BoardGame {
  cols: number;
  rows: number;
  tiles: Array<TileGame>;
  // tilesRows: Array<Array<Tile>>;
}

export interface TileGame {
  // idPlayer: string;
  // displayNamePlayer: string;
  id: number;
  description: string;
  typeTileGame: number;
  dragEnable?: boolean;
  classCss?: any;
  previousValues?: TileGame;
}
