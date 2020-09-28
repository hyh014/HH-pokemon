import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PokedexService } from '../../service/pokedex.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-catch-list',
  templateUrl: './catch-list.component.html',
  styleUrls: ['./catch-list.component.css']
})
export class CatchListComponent implements OnInit {
  @Output() infoChange = new EventEmitter();

  opened = false;
  list = [];
  imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  constructor(private PokedexService: PokedexService, private _snackBar: MatSnackBar) { }

  show() {
    if (!this.opened) {

      this.list = this.PokedexService.retrieveList();

    }
  }
  handleInfo(i) {
    const pokemon = this.list[i];
    this.infoChange.emit(pokemon);
  }
  catch(i) {

    const flag = this.PokedexService.catch(i);
    var msg = "";
    flag ? msg = 'Caught Your Pokemon!' : msg = 'Release Your Pokemon!';
    this._snackBar.open(msg, 'close', {
      duration: 2000
    });
  }
  delete(i) {

    this.PokedexService.removeCatchFromList(i);
    this._snackBar.open('Successfully Deleted!', 'close', {
      duration: 2000
    });
  }
  ngOnInit(): void {

  }


}
