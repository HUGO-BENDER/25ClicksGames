export interface BoardGame {
  cols: number;
  rows: number;
  tiles: Array<TileGame>;
}

export enum TypeTileGame {
  emptySpace,
  Reactor,
  StraightConnector,
  CurvedConnector,
  Cannon,
}

export enum StateTileGame {
  Idle,
  Destroyed,
}

export interface TileGame {
  // idPlayer: string;
  // displayNamePlayer: string;
  id: number;
  description: string;
  typeTileGame: TypeTileGame;
  state: StateTileGame;
  borders: Array<number>;
  dragEnable?: boolean;
  showDropIsAllowed?: boolean;
  showDropIsNotAllowed?: boolean;
  rotation?: number;
  classCss: string;
  previousValues?: TileGame;
}
