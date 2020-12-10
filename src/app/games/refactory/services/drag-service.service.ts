import { Injectable } from '@angular/core';
import {
  BoardGame,
  TileGame,
  TypeTileGame,
} from 'src/app/components/app-model/board';

@Injectable({
  providedIn: 'root',
})
export class DragService {
  idLastTileOnDragOver = -1;
  counterDragDrop = 0;
  private boardGame: BoardGame;
  private cardInHand: TileGame;

  constructor() {}

  InicializeService(board: BoardGame, card: TileGame) {
    this.boardGame = board;
    this.cardInHand = card;
  }

  startDrag(e: any) {
    if (!this.cardInHand.dragEnable) {
      e.stopPropagation();
      e.preventDefault();
    } else {
      e.dataTransfer.effecAllowed = 'move'; // Define el efecto como mover
      e.dataTransfer.setData('Data', this.cardInHand.typeTileGame); // Coje el elemento que se va a mover
      e.dataTransfer.setDragImage(e.target, 50, 50); // Define la imagen que se vera al ser arrastrado el elemento y por donde se coje el elemento que se va a mover (el raton aparece en la esquina sup_izq con 0,0)
      e.target.style.opacity = '0.3'; // Establece la opacidad del elemento que se va arrastrar
    }
  }

  finishDrag(e: any) {
    if (this.cardInHand.dragEnable) {
      e.target.style.opacity = '1';
    } else {
      e.target.style.opacity = '0.1';
    }
  }

  onDragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
    this.counterDragDrop++;
  }

  onDragLeave(e) {
    e.stopPropagation();
    e.preventDefault();
    this.counterDragDrop--;

    if (this.counterDragDrop == 0) {
      this.boardGame.tiles[this.idLastTileOnDragOver].showDropIsAllowed = false;
      this.boardGame.tiles[
        this.idLastTileOnDragOver
      ].showDropIsNotAllowed = false;
      this.idLastTileOnDragOver = -1;
    }
  }

  onDrop(e, t: TileGame) {
    console.log('hicimos el drop en ' + t.description);
    e.preventDefault();
    this.boardGame.tiles[this.idLastTileOnDragOver].showDropIsAllowed = false;
    this.boardGame.tiles[
      this.idLastTileOnDragOver
    ].showDropIsNotAllowed = false;
    this.copyTileData(
      this.cardInHand,
      this.boardGame.tiles[this.idLastTileOnDragOver]
    );
    t.typeTileGame = this.cardInHand.typeTileGame;
    t.classCss = this.cardInHand.classCss.toString();
    this.idLastTileOnDragOver = -1;
    this.cardInHand.dragEnable = false;
  }

  onDragOver(e, t: TileGame) {
    if (this.IsOnOverEmptySpace(t)) {
      this.updateTileOnDragOver(t);
      if (this.IsDropAllowed(t)) {
        e.preventDefault();
        this.boardGame.tiles[
          this.idLastTileOnDragOver
        ].showDropIsAllowed = true;
        this.boardGame.tiles[
          this.idLastTileOnDragOver
        ].showDropIsNotAllowed = false;
      } else {
        this.boardGame.tiles[
          this.idLastTileOnDragOver
        ].showDropIsAllowed = false;
        this.boardGame.tiles[
          this.idLastTileOnDragOver
        ].showDropIsNotAllowed = true;
      }
    }
  }

  private updateTileOnDragOver(t: TileGame) {
    if (this.idLastTileOnDragOver != -1) {
      if (this.idLastTileOnDragOver != t.id) {
        this.boardGame.tiles[
          this.idLastTileOnDragOver
        ].showDropIsAllowed = false;
        this.boardGame.tiles[
          this.idLastTileOnDragOver
        ].showDropIsNotAllowed = false;
        this.idLastTileOnDragOver = t.id;
      }
    } else {
      this.idLastTileOnDragOver = t.id;
    }
  }

  private IsDropAllowed(t: TileGame) {
    let isTopValid = false;
    let isRightValid = false;
    let isLeftValid = false;
    let isBottomValid = false;
    let isConected = false;

    if (t.id >= this.boardGame.cols) {
      if (
        this.boardGame.tiles[t.id - this.boardGame.cols].borders[2] ==
          this.cardInHand.borders[0 + this.cardInHand.rotation / 90] ||
        this.boardGame.tiles[t.id - this.boardGame.cols].borders[2] == 0
      ) {
        isTopValid = true;
        if (this.boardGame.tiles[t.id - this.boardGame.cols].borders[2] != 0) {
          isConected = true;
        }
      }
    } else {
      isTopValid = true;
    }

    if (t.id % this.boardGame.cols != this.boardGame.cols - 1) {
      if (
        this.boardGame.tiles[t.id + 1].borders[3] ==
          this.cardInHand.borders[(1 + this.cardInHand.rotation / 90) % 4] ||
        this.boardGame.tiles[t.id + 1].borders[3] == 0
      ) {
        isRightValid = true;
        if (this.boardGame.tiles[t.id + 1].borders[3] != 0) {
          isConected = true;
        }
      }
    } else {
      isRightValid = true;
    }

    if (t.id < this.boardGame.tiles.length - this.boardGame.cols) {
      if (
        this.boardGame.tiles[t.id + this.boardGame.cols].borders[0] ==
          this.cardInHand.borders[(2 + this.cardInHand.rotation / 90) % 4] ||
        this.boardGame.tiles[t.id + this.boardGame.cols].borders[0] == 0
      ) {
        isBottomValid = true;
        if (this.boardGame.tiles[t.id + this.boardGame.cols].borders[0] != 0) {
          isConected = true;
        }
      }
    } else {
      isBottomValid = true;
    }

    if (t.id % this.boardGame.cols != 0) {
      if (
        this.boardGame.tiles[t.id - 1].borders[1] ==
          this.cardInHand.borders[(3 + this.cardInHand.rotation / 90) % 4] ||
        this.boardGame.tiles[t.id - 1].borders[1] == 0
      ) {
        isLeftValid = true;
        if (this.boardGame.tiles[t.id - 1].borders[1] != 0) {
          isConected = true;
        }
      }
    } else {
      isLeftValid = true;
    }

    return (
      isTopValid && isRightValid && isBottomValid && isLeftValid && isConected
    );
  }

  private IsOnOverEmptySpace(t: TileGame) {
    return t.typeTileGame == TypeTileGame.emptySpace;
  }

  copyTileData(tileFrom: TileGame, tileTo: TileGame, bk: boolean = true) {
    if (bk) {
      tileTo.previousValues = {
        id: tileTo.id,
        description: tileTo.description,
        typeTileGame: tileTo.typeTileGame,
        state: tileTo.state,
        borders: [
          tileTo.borders[0],
          tileTo.borders[1],
          tileTo.borders[2],
          tileTo.borders[3],
        ],
        rotation: tileTo.rotation,
        classCss: tileTo.classCss,
      };
      if (tileFrom) {
        tileTo.description = tileFrom.description;
        tileTo.typeTileGame = tileFrom.typeTileGame;
        tileTo.rotation = tileFrom.rotation;
        tileTo.classCss = tileFrom.classCss;
      } else {
        tileTo.description = null;
        tileTo.typeTileGame = TypeTileGame.emptySpace;
        tileTo.rotation = 0;
        tileTo.classCss = null;
      }
    }
  }
}
