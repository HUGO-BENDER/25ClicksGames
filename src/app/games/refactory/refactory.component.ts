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
  LayersTileGame,
} from 'src/app/components/app-model/board';
import { GameService } from './services/game-service.service';
import { DragService } from './services/drag-service.service';

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
  styleCalculateGrid: object;
  cardInHand: TileGame;

  // imgOnDrag :any;
  idLastTileOnDragOver = -1;
  counterDragDrop = 0;

  userlogined = true;

  //#endregion

  constructor(private svcGame: GameService, public svcDrag: DragService) {}

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
    this.styleCalculateGrid = this.calculateStyleGrid();
    this.cardInHand =  this.svcGame.getCardInHand('ddddd');

    this.svcDrag.InicializeService(this.boardGame, this.cardInHand);
  }
  calculateStyleGrid(): object {
    let boardWidth = this.boardGame.cols * 192;
    let boardHeight = this.boardGame.rows * 192;
    let sty = { 
      "display" : "grid" ,
      "grid-template-columns" : " auto".repeat(this.boardGame.cols),
      "max-width.px" :  boardWidth,
      "min-width.px" :  boardWidth ,
      "min-height.px" :  boardHeight,
      "max-height.px" :  boardHeight 
    }
    return sty;
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

  //#region Auxiliares

  // copyTileData(tileFrom: TileGame, tileTo: TileGame, bk: boolean = true) {
  //   if (bk) {
  //     tileTo.previousValues = {
  //       id: tileTo.id,
  //       description: tileTo.description,
  //       typeTileGame: tileTo.typeTileGame,
  //       state: tileTo.state,
  //       borders: [
  //         tileTo.borders[0],
  //         tileTo.borders[1],
  //         tileTo.borders[2],
  //         tileTo.borders[3],
  //       ],
  //       rotation: tileTo.rotation,
  //       classCss: tileTo.classCss,
  //     };
  //     if (tileFrom) {
  //       tileTo.description = tileFrom.description;
  //       tileTo.typeTileGame = tileFrom.typeTileGame;
  //       tileTo.rotation = tileFrom.rotation;
  //       tileTo.classCss = tileFrom.classCss;
  //     } else {
  //       tileTo.description = null;
  //       tileTo.typeTileGame = TypeTileGame.emptySpace;
  //       tileTo.rotation = 0;
  //       tileTo.classCss = null;
  //     }
  //   }
  // }
  //#endregion
}
