import { Injectable } from '@angular/core';
import { BoardGame } from 'src/app/components/app-model/board';

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
      });
    }
    return this.auxBoardGame;
    // return this.afs.collection('Games').doc(id).collection('BoardGame').ref;
  }
}
