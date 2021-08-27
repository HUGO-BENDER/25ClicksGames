import { Injectable } from '@angular/core';
import {
  BoardGame,
  TileGame,
  LayersTileGame,
  SideTileGame,
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
      e.dataTransfer.effecAllowed = 'move';
      e.dataTransfer.setData('Data', this.cardInHand.layers);
      e.dataTransfer.setDragImage(e.target, 0, 0);
      e.target.style.opacity = '0.1';
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
      this.boardGame.tiles[this.idLastTileOnDragOver].showDropIsNotAllowed =
        false;
      this.idLastTileOnDragOver = -1;
    }
  }

  onDrop(e, t: TileGame) {
    this.boardGame.tiles[this.idLastTileOnDragOver].showDropIsAllowed = false;
    this.boardGame.tiles[this.idLastTileOnDragOver].showDropIsNotAllowed =
      false;
    this.copyTileData(
      this.cardInHand,
      this.boardGame.tiles[this.idLastTileOnDragOver]
    );
    t.classCss = this.cardInHand.classCss.toString();
    this.idLastTileOnDragOver = -1;
    this.cardInHand.dragEnable = false;
    console.log('hicimos el drop en ' + t.description);
    e.preventDefault();
  }

  onDragOver(e, t: TileGame) {
    if (this.IsTileNullOrEmptySpace(t)) {
      this.updateTileOnDragOver(t);
      if (this.IsDropAllowed(t)) {
        this.boardGame.tiles[this.idLastTileOnDragOver].showDropIsAllowed =
          true;
        this.boardGame.tiles[this.idLastTileOnDragOver].showDropIsNotAllowed =
          false;
        e.preventDefault();
      } else {
        this.boardGame.tiles[this.idLastTileOnDragOver].showDropIsAllowed =
          false;
        this.boardGame.tiles[this.idLastTileOnDragOver].showDropIsNotAllowed =
          true;
      }
    }
  }

  private updateTileOnDragOver(t: TileGame) {
    if (this.idLastTileOnDragOver != -1) {
      if (this.idLastTileOnDragOver != t.id) {
        this.boardGame.tiles[this.idLastTileOnDragOver].showDropIsAllowed =
          false;
        this.boardGame.tiles[this.idLastTileOnDragOver].showDropIsNotAllowed =
          false;
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
    let idTop = t.id - this.boardGame.cols;
    let idRight = t.id + 1;
    let idBottom = t.id + this.boardGame.cols;
    let idLeft = t.id - 1;

    if (t.id >= this.boardGame.cols) {
      if (this.IsTileNullOrEmptySpace(this.boardGame.tiles[idTop])) {
        isTopValid = true;
        isConected = false;
      } else {
        let iLastBorderTileTop = this.getIndexBorderTileOnBoard(
          idTop,
          SideTileGame.Bottom
        );
        let iFirstBorderTileHand = this.getIndexBorderTileInHand(
          SideTileGame.Top
        );
        let borderTopIsAllEmpty = true;
        for (
          let index = 0;
          index < this.boardGame.tileSectionsPerSide - 1;
          index++
        ) {
          if (
            this.boardGame.tiles[idTop].borders[iLastBorderTileTop - index] != 0
          ) {
            borderTopIsAllEmpty = false;
            break;
          }
        }

        if (borderTopIsAllEmpty) {
          isTopValid = true;
          isConected = false;
        } else {
          isTopValid = true;
          for (
            let index = 0;
            index < this.boardGame.tileSectionsPerSide;
            index++
          ) {
            if (
              this.cardInHand.borders[iFirstBorderTileHand + index] !=
              this.boardGame.tiles[idTop].borders[iLastBorderTileTop - index]
            ) {
              isTopValid = false;
              break;
            }
          }
          isConected = isTopValid;
        }
      }
    } else {
      isTopValid = true;
      isConected = false;
    }

    /* ----------------------------------------------------------------- */

    if (t.id % this.boardGame.cols != this.boardGame.cols - 1) {
      if (this.IsTileNullOrEmptySpace(this.boardGame.tiles[idRight])) {
        isRightValid = true;
        isConected = isConected || false;
      } else {
        let iLastBorderTileRight = this.getIndexBorderTileOnBoard(
          idRight,
          SideTileGame.Left
        );
        let iFirstBorderTileHand = this.getIndexBorderTileInHand(
          SideTileGame.Right
        );
        let borderRightIsAllEmpty = true;
        for (
          let index = 0;
          index < this.boardGame.tileSectionsPerSide - 1;
          index++
        ) {
          if (
            this.boardGame.tiles[idRight].borders[
              iLastBorderTileRight - index
            ] != 0
          ) {
            borderRightIsAllEmpty = false;
            break;
          }
        }

        if (borderRightIsAllEmpty) {
          isRightValid = true;
          isConected = isConected || false;
        } else {
          isRightValid = true;
          for (
            let index = 0;
            index < this.boardGame.tileSectionsPerSide;
            index++
          ) {
            if (
              this.cardInHand.borders[iFirstBorderTileHand + index] !=
              this.boardGame.tiles[idRight].borders[
                iLastBorderTileRight - index
              ]
            ) {
              isTopValid = false;
              break;
            }
          }
          isConected = isConected || isTopValid;
        }
      }
    } else {
      isRightValid = true;
      isConected = isConected || false;
    }

    /* ----------------------------------------------------------------- */

    if (t.id < this.boardGame.tiles.length - this.boardGame.cols) {
      if (this.IsTileNullOrEmptySpace(this.boardGame.tiles[idBottom])) {
        isBottomValid = true;
        isConected = isConected || false;
      } else {
        let iLastBorderTileBottom = this.getIndexBorderTileOnBoard(
          idBottom,
          SideTileGame.Top
        );
        let iFirstBorderTileHand = this.getIndexBorderTileInHand(
          SideTileGame.Bottom
        );
        let borderBottomIsAllEmpty = true;

        for (
          let index = 0;
          index < this.boardGame.tileSectionsPerSide - 1;
          index++
        ) {
          if (
            this.boardGame.tiles[idBottom].borders[
              iLastBorderTileBottom - index
            ] != 0
          ) {
            borderBottomIsAllEmpty = false;
            break;
          }
        }

        if (borderBottomIsAllEmpty) {
          isBottomValid = true;
          isConected = isConected || false;
        } else {
          isBottomValid = true;
          for (
            let index = 0;
            index < this.boardGame.tileSectionsPerSide;
            index++
          ) {
            if (
              this.cardInHand.borders[iFirstBorderTileHand + index] !=
              this.boardGame.tiles[idBottom].borders[
                iLastBorderTileBottom - index
              ]
            ) {
              isBottomValid = false;
              break;
            }
          }
          isConected = isConected || isBottomValid;
        }
      }
    } else {
      isBottomValid = true;
      isConected = isConected || false;
    }

    /* ----------------------------------------------------------------- */

    if (t.id % this.boardGame.cols != 0) {
      if (this.IsTileNullOrEmptySpace(this.boardGame.tiles[idLeft])) {
        isLeftValid = true;
        isConected = isConected || false;
      } else {
        let iLastBorderTileLeft = this.getIndexBorderTileOnBoard(
          idLeft,
          SideTileGame.Right
        );
        let iFirstBorderTileHand = this.getIndexBorderTileInHand(
          SideTileGame.Left
        );
        let borderLeftIsAllEmpty = true;
        for (
          let index = 0;
          index < this.boardGame.tileSectionsPerSide - 1;
          index++
        ) {
          if (
            this.boardGame.tiles[idLeft].borders[iLastBorderTileLeft - index] !=
            0
          ) {
            borderLeftIsAllEmpty = false;
            break;
          }
        }

        if (borderLeftIsAllEmpty) {
          isLeftValid = true;
          isConected = isConected || false;
        } else {
          isLeftValid = true;
          for (
            let index = 0;
            index < this.boardGame.tileSectionsPerSide;
            index++
          ) {
            if (
              this.cardInHand.borders[iFirstBorderTileHand + index] !=
              this.boardGame.tiles[idLeft].borders[iLastBorderTileLeft - index]
            ) {
              isLeftValid = false;
              break;
            }
          }
          isConected = isConected || isLeftValid;
        }
      }
    } else {
      isLeftValid = true;
    }

    return (
      isTopValid && isRightValid && isBottomValid && isLeftValid && isConected
    );
  }

  private getIndexBorderTileInHand(side: SideTileGame) {
    let r: number = <number>side;
    switch (this.cardInHand.rotation) {
      case 0:
        break;
      default:
        r = (r + (4 - this.cardInHand.rotation / 90)) % 4;
        break;
    }
    let i = this.boardGame.tileSectionsPerSide * r;
    return i;
  }

  private getIndexBorderTileOnBoard(
    idTile: number,
    side: SideTileGame
  ): number {
    let r: number = <number>side;
    switch (this.boardGame.tiles[idTile].rotation) {
      case 0:
        break;
      default:
        r = (r + (4 - this.boardGame.tiles[idTile].rotation / 90)) % 4;
        break;
    }
    let i = this.boardGame.tileSectionsPerSide * (r + 1) - 1;
    return i;
  }

  private IsTileNullOrEmptySpace(t: TileGame) {
    if (!t.layers) {
      return true;
    } else {
      return t.layers.emptySpace;
    }
  }

  private copyTileData(
    tileFrom: TileGame,
    tileTo: TileGame,
    bk: boolean = true
  ) {
    if (bk) {
      tileTo.previousValues = {
        id: tileTo.id,
        description: tileTo.description};





      //   layers: {
      //     ConnectorCurve: !!i.layers.ConnectorCurve,
      //     ConnectorStraight: !!i.layers.ConnectorStraight,
      //     ConnectorT: !!i.layers.ConnectorT,
      //     Platform: !!i.layers.Platform,
      //     Reactor: !!i.layers.Reactor,
      //     Weapon01: !!i.layers.Weapon01,
      //     Weapon02: !!i.layers.Weapon02,
      //     Weapon03: !!i.layers.Weapon03,
      //     Weapon04: !!i.layers.Weapon04
      // }



      //   layers: {
      //     ConnectorCurve: tileTo.layers.ConnectorCurve ? true : false,
      //     ConnectorStraight: tileTo.layers.ConnectorStraight ? true : false,
      //     ConnectorT: tileTo.layers.ConnectorT ? true : false,
      //     Platform: tileTo.layers.Platform ? true : false,
      //     Reactor: tileTo.layers.Reactor ? true : false,
      //     Weapon01: tileTo.layers.Weapon01 ? true : false,
      //     Weapon02: tileTo.layers.Weapon02 ? true : false,
      //     Weapon03: tileTo.layers.Weapon03 ? true : false,
      //     Weapon04: tileTo.layers.Weapon04 ? true : false,
      //   },
      //   state: tileTo.state,
      //   borders: [
      //     tileTo.borders[0],
      //     tileTo.borders[1],
      //     tileTo.borders[2],
      //     tileTo.borders[3],
      //     tileTo.borders[4],
      //     tileTo.borders[5],
      //     tileTo.borders[6],
      //     tileTo.borders[7],
      //     tileTo.borders[8],
      //     tileTo.borders[9],
      //     tileTo.borders[10],
      //     tileTo.borders[11],
      //   ],
      //   rotation: tileTo.rotation,
      //   classCss: tileTo.classCss,
      



      if (tileFrom) {
        tileTo.description = tileFrom.description;
        tileTo.layers = {
          ConnectorCurve: tileFrom.layers.ConnectorCurve ? true : false,
          ConnectorStraight: tileFrom.layers.ConnectorStraight ? true : false,
          ConnectorT: tileFrom.layers.ConnectorT ? true : false,
          Platform: tileFrom.layers.Platform ? true : false,
          Reactor: tileFrom.layers.Reactor ? true : false,
          Weapon01: tileFrom.layers.Weapon01 ? true : false,
          Weapon02: tileFrom.layers.Weapon02 ? true : false,
          Weapon03: tileFrom.layers.Weapon03 ? true : false,
          Weapon04: tileFrom.layers.Weapon04 ? true : false,
        };
        tileTo.rotation = tileFrom.rotation;
        tileTo.classCss = tileFrom.classCss;
      } else {
        tileTo.description = null;
        tileTo.layers = { emptySpace: true };
        tileTo.rotation = 0;
        tileTo.classCss = null;
      }
    }
  }
}
