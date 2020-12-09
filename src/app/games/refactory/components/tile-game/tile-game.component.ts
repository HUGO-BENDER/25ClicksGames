import { Component, Input, OnInit } from '@angular/core';
import { TileGame, TypeTileGame } from 'src/app/components/app-model/board';

@Component({
  selector: 'app-tile-game',
  templateUrl: './tile-game.component.html',
  styleUrls: ['./tile-game.component.scss'],
})
export class TileGameComponent implements OnInit {
  @Input() TileData: TileGame;

  _TypeTileGame = TypeTileGame;

  constructor() {}

  ngOnInit(): void {}

  ActionTile() {
    console.log(this.TileData.typeTileGame);
    console.log(this.TileData.classCss);

    // if (this.TileData.typeTileGame === 4) {
    //   this.TileData.typeTileGame = 0;
    // } else {
    //   this.TileData.typeTileGame = TypeTileGame.emptySpace;
    // }
  }
}
