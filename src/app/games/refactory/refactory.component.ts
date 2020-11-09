import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { BoardGame } from 'src/app/components/app-model/board';
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
  }

  // -- Botons
  // drawerToggleAndResize(drawer: any) {
  //   drawer.toggle();
  //   ResizeAll();
  // }

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
}
