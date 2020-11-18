import { Component, Input, OnInit } from '@angular/core';
import { TileGame } from 'src/app/components/app-model/board';

@Component({
  selector: 'app-tile-game',
  templateUrl: './tile-game.component.html',
  styleUrls: ['./tile-game.component.scss'],
})
export class TileGameComponent implements OnInit {
  @Input() TileData: TileGame;

  constructor() {}

  ngOnInit(): void {}

  ActionTile() {
    console.log(this.TileData.typeTileGame);
    if (this.TileData.typeTileGame === 4) {
      this.TileData.typeTileGame = 0;
    } else {
      this.TileData.typeTileGame += 1;
    }
  }
}
