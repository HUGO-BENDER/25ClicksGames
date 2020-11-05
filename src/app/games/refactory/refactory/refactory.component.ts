import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game-refactory',
  templateUrl: './refactory.component.html',
  styleUrls: ['./refactory.component.scss'],
  animations: [
    trigger('animReadyToSend', [
      state(
        'outside',
        style({
          position: 'absolute',
          transform: 'translateX(-100%)',
        })
      ),
      state(
        'inside',
        style({
          position: 'relative',
          transform: 'translateX(0)',
        })
      ),
      transition('outside <=> inside', animate('300ms')),
    ]),
  ],
})
export class RefactoryComponent implements OnInit {
  //#region Variables
  stateButtons = 'inside';
  //#endregion

  constructor() {}

  ngOnInit(): void {}

  // -- Botons
  public resetTurn() {
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

  public sendTurn() {
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
