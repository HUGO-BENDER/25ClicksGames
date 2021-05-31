import { Injectable } from '@angular/core';
import {
  BoardGame,
  StateTileGame,
  TypeTileGame,
} from 'src/app/components/app-model/board';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  auxBoardGame: BoardGame = { cols: 10, rows: 10, tiles: [] };

  constructor() {}

  public getBoard(id: string) {
    for (let i = 0; i < 100; i++) {
      this.auxBoardGame.tiles.push({
        id: i,
        description: 'desc_' + i,
        typeTileGame: TypeTileGame.emptySpace,
        state: StateTileGame.Idle,
        borders: [0, 0, 0, 0],
        rotation: 0,
        classCss: 'rotation0 imgTileIdleAnimation',
      });
    }

    this.auxBoardGame.tiles[45].typeTileGame = TypeTileGame.Reactor;
    this.auxBoardGame.tiles[45].borders = [1, 1, 1, 1];
    this.auxBoardGame.rows = 10;
    this.auxBoardGame.cols = 10;

    return this.auxBoardGame;
    // return this.afs.collection('Games').doc(id).collection('BoardGame').ref;
  }
}
