import { Injectable } from '@angular/core';
import {
  BoardGame,
  StateTileGame,
  TileGame,
} from 'src/app/components/app-model/board';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  auxBoardGame: BoardGame = { cols: null, rows: null, tiles: [] };

  constructor() {}

  public getBoard(id: string) {
    this.auxBoardGame.cols = 21;
    this.auxBoardGame.rows = 10;
    this.auxBoardGame.tileSides = 4;
    this.auxBoardGame.tileSectionsPerSide = 3;
    for (let i = 0; i < this.auxBoardGame.cols * this.auxBoardGame.rows; i++) {
      this.auxBoardGame.tiles.push({
        id: i,
        description: 'desc_' + i,
      });
    }



    this.auxBoardGame.tiles[45].layers = {
      emptySpace: false,
      ConnectorBase: true,
      Platform: true,
      Reactor: true,
    };
    this.auxBoardGame.tiles[45].borders = [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
    this.auxBoardGame.tiles[45].classCss = 'rotation0 imgTileIdleAnimation';
    this.auxBoardGame.tiles[45].rotation = 0;
    this.auxBoardGame.tiles[45].description = 'Reactor';

    return this.auxBoardGame;
    // return this.afs.collection('Games').doc(id).collection('BoardGame').ref;
  }

  public getCardInHand(id: string): TileGame {
    let fakecardInHand = <TileGame>{
      id: 101,
      description: 'desc_101',
      layers: { ConnectorCurve: true },
      state: StateTileGame.Idle,
      borders: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
      rotation: 0,
      classCss: 'rotation0 imgTileIdleAnimation',
      dragEnable: true,
    };

    return fakecardInHand;
  }
}
