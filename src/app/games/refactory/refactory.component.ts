import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {
  BoardGame,
  StateTileGame,
  TileGame,
  TypeTileGame,
} from 'src/app/components/app-model/board';
import { TileGameComponent } from './components/tile-game/tile-game.component';
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
  tileOnDragOver: TileGame;

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
      previousValues: {
        id: 101,
        description: 'desc_101',
        typeTileGame: TypeTileGame.StraightConnector,
        state: StateTileGame.Idle,
        borders: [0, 1, 0, 1],
        rotation: 0,
        classCss: 'rotation0',
      },
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
    this.cardInHand.previousValues.rotation = this.cardInHand.rotation;
    this.cardInHand.rotation += r;
    this.cardInHand.rotation = this.cardInHand.rotation % 360;
    if (this.cardInHand.rotation < 0) {
      this.cardInHand.rotation = 360 + this.cardInHand.rotation;
    }
    this.cardInHand.classCss = this.cardInHand.classCss.replace(
      'rotation' + this.cardInHand.previousValues.rotation,
      'rotation' + this.cardInHand.rotation
    );
  }

  //#region Drag and Drop
  startDrag(e: any) {
    console.log('Empezamos el drag !!!');
    e.dataTransfer.effecAllowed = 'move'; // Define el efecto como mover
    e.dataTransfer.setData('Data', this.cardInHand.typeTileGame); // Coje el elemento que se va a mover
    e.dataTransfer.setDragImage(e.target, 50, 50); // Define la imagen que se vera al ser arrastrado el elemento y por donde se coje el elemento que se va a mover (el raton aparece en la esquina sup_izq con 0,0)
    e.target.style.opacity = '0.4'; // Establece la opacidad del elemento que se va arrastrar
  }

  onDragLeave() {
    if (this.tileOnDragOver != null) {
      this.tileOnDragOver.classCss = '';
      this.tileOnDragOver = null;
    }
  }

  onDrop(e, t: TileGame) {
    console.log('hicimos el drop en ' + t.description);
    e.preventDefault();
    //--copy tileData
    t.typeTileGame = this.cardInHand.typeTileGame;
    t.classCss = this.cardInHand.classCss.toString();
    this.tileOnDragOver = null;
  }

  onDragOver(e, t: TileGame) {
    if (this.IsOnOverEmptySpace(t)) {
      this.updateTileOnDragOver(t);
      if (this.IsDropRNAllowed(t)) {
        e.preventDefault();

        t.classCss = 'imgTileIdleRecta ' + this.cardInHand.classCss;
        this.tileOnDragOver = t;
      } else {
        t.classCss = 'dropIsNotAllowed';
      }
    }
  }
  private updateTileOnDragOver(t: TileGame) {
    if (this.tileOnDragOver != null) {
      if (this.tileOnDragOver.id != t.id) {
        this.tileOnDragOver.classCss = '';
      }
    } else {
      this.tileOnDragOver = t;
    }
  }

  private IsDropRNAllowed(t: TileGame) {
    let isTopValid = false;
    let isConected = false;
    //-- Tile Upper

    if (t.id >= this.boardGame.cols) {
      this.boardGame.tiles[t.id - this.boardGame.cols].classCss = 'test1';

      if (
        this.boardGame.tiles[t.id - this.boardGame.cols].borders[2] ==
        this.cardInHand.borders[0 + this.cardInHand.rotation / 90]
      ) {
        isTopValid = true;
        if (this.boardGame.tiles[t.id - this.boardGame.cols].borders[2] != 0) {
          isConected = true;
        }
        // console.log(
        //   'this.boardGame.tiles[t.id - this.boardGame.cols].borders[2] ' +
        //     this.boardGame.tiles[t.id - this.boardGame.cols].borders
        // );
        // console.log(
        //   'this.cardInHand..borders[0 + (this.cardInHand..rotation / 90 )] ' +
        //     this.cardInHand.borders +
        //     ' this.cardInHand..rotation ' +
        //     this.cardInHand.rotation
        // );
      }
    }

    if (t.id % this.boardGame.cols != this.boardGame.cols - 1) {
      this.boardGame.tiles[t.id + 1].classCss = 'test2';
    }

    return false;
  }

  private IsOnOverEmptySpace(t: TileGame) {
    return t.typeTileGame == TypeTileGame.emptySpace;
  }
  //#endregion
}
