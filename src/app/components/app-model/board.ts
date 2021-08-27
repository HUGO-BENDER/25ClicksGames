export interface BoardGame {
  cols: number;
  rows: number;
  tileSides?: number;
  tileSectionsPerSide?: number;
  tiles: Array<TileGame>;
}

export interface LayersTileGame {
  emptySpace?: boolean;
  ConnectorBase?: boolean;
  ConnectorCurve?: boolean;
  ConnectorStraight?: boolean;
  ConnectorT?: boolean;
  Platform?:boolean;
  Reactor?: boolean;
  Weapon01?: boolean;
  Weapon02?: boolean;
  Weapon03?: boolean;
  Weapon04?: boolean;
}

export enum StateTileGame {
  Idle,
  Destroyed,
}

export enum SideTileGame {
  Top,
  Right,
  Bottom,
  Left
}

export interface TileGame {
  // idPlayer: string;
  // displayNamePlayer: string;
  id: number;
  description: string;
  layers?: LayersTileGame;
  state?: StateTileGame;
  borders?: Array<number>;
  dragEnable?: boolean;
  showDropIsAllowed?: boolean;
  showDropIsNotAllowed?: boolean;
  rotation?: number;
  classCss?: string;
  previousValues?: TileGame;
}
