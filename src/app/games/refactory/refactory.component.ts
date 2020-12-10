import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  BoardGame,
  StateTileGame,
  TileGame,
  TypeTileGame,
} from 'src/app/components/app-model/board';
import { GameService } from './services/game-service.service';

@Component({
  selector: 'game-refactory',
  templateUrl: './refactory.component.html',
  styleUrls: ['./refactory.component.scss'],
  animations: [
    trigger('slideInButtonsTurn', [
      state(
        'outside',
        style({
          position: 'absolute',
          transform: 'translateX(-1000%)',
        })
      ),
      state(
        'inside',
        style({
          position: 'relative',
          transform: 'translateX(0)',
        })
      ),
      transition('outside <=> inside', animate('500ms')),
    ]),
  ],
})
//TODO Sacar las animaciones a un archivo aparte
export class RefactoryComponent implements OnInit {
  //#region Variables
  stateButtons = 'inside';
  stateGame = 0;
  boardGame: BoardGame;
  cardInHand: TileGame;

  idLastTileOnDragOver = -1;
  counterDragDrop = 0;
  userlogined = true;

  //#endregion

  constructor(private svcGame: GameService) {}

  ngOnInit(): void {
    // this.InicializeGame();
    // this.CheckUser();
    // if (this.userlogined) {
    this.StartGame();
    // } else {
    //   this.GoHome();
    // }
  }

  InicializeGame() {
    throw new Error('Method not implemented.');
  }

  StartGame() {
    this.boardGame = this.svcGame.getBoard('ddddd');
    this.cardInHand = {
      id: 101,
      description: 'desc_101',
      typeTileGame: TypeTileGame.StraightConnector,
      state: StateTileGame.Idle,
      borders: [0, 1, 0, 1],
      rotation: 0,
      classCss: 'rotation0',
      dragEnable: true,
    };
  }

  // -- Botons
  resetTurn() {
    // for (const hc of this.hand) {
    //   hc.dragEnable = true;
    //   if (hc.previousValues) {
    //     this.copyValues(hc.previousValues, hc, false);
    //     hc.previousValues = null;
    //   }
    // }
    // for (const bc of this.boardCellChanged) {
    //   if (bc.previousValues) {
    //     this.copyValues(bc.previousValues, bc, false);
    //     bc.previousValues = null;
    //   }
    // }
    // this.boardCellChanged = [];
    this.stateButtons = 'outside';
  }

  sendTurn() {
    // const idGame = this.route.snapshot.paramMap.get('id');
    // this.afsGame.senTurn(
    //   this.hand, this.boardCellChanged,
    //   idGame, this.userlogined.uid, this.currentGame.turnCont
    // )
    //   .then(() => {
    //     console.log('xSe ha enviado el Turno');
    this.stateButtons = 'outside';
    //     this.stateGame = gameState.WAITING;
    //     this.ShowToastMessage('xSe ha enviado el Turno');
    //   })
    //   .catch((error) => {
    //     this.ShowToastMessage('xError :-( ');
    //     console.log('Error adding document: ', error);
    //   });
  }

  rotateCardInHand(r: number) {
    if (this.cardInHand.dragEnable) {
      let preRotation = this.cardInHand.rotation;
      this.cardInHand.rotation += r;
      this.cardInHand.rotation = this.cardInHand.rotation % 360;
      if (this.cardInHand.rotation < 0) {
        this.cardInHand.rotation = 360 + this.cardInHand.rotation;
      }
      this.cardInHand.classCss = this.cardInHand.classCss.replace(
        'rotation' + preRotation,
        'rotation' + this.cardInHand.rotation
      );
    }
  }

  //#region Drag and Drop
  startDrag(e: any) {
    if (!this.cardInHand.dragEnable) {
      e.stopPropagation();
      e.preventDefault();

      console.log(
        'No deberiamos Empezar el drag !!! this.cardInHand.dragEnable = ' +
          this.cardInHand.dragEnable
      );
    } else {
      console.log(
        'Empezamos el drag !!! this.cardInHand.dragEnable = ' +
          this.cardInHand.dragEnable
      );

      e.dataTransfer.effecAllowed = 'move'; // Define el efecto como mover
      e.dataTransfer.setData('Data', this.cardInHand.typeTileGame); // Coje el elemento que se va a mover
      e.dataTransfer.setDragImage(e.target, 50, 50); // Define la imagen que se vera al ser arrastrado el elemento y por donde se coje el elemento que se va a mover (el raton aparece en la esquina sup_izq con 0,0)
      e.target.style.opacity = '0.3'; // Establece la opacidad del elemento que se va arrastrar
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
  //#endregion

  //#region Auxiliares

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
  //#endregion
}
