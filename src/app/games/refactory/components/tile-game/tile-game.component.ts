import { Component, Input, OnInit } from '@angular/core';
import { TileGame, LayersTileGame } from 'src/app/components/app-model/board';

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
    console.log(this.TileData.id + '  ' + this.TileData.description);
    console.log('this.TileData.dragEnable ' + this.TileData.dragEnable);
    // if (this.TileData.typeTileGame === 4) {
    //   this.TileData.typeTileGame = 0;
    // } else {
    //   this.TileData.typeTileGame = TypeTileGame.emptySpace;
    // }
  }
}
