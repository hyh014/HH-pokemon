import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';

import axios from 'axios';
import { PokedexService } from '../../service/pokedex.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-poke-info',
  templateUrl: './poke-info.component.html',
  styleUrls: ['./poke-info.component.css']
})
export class PokeInfoComponent implements OnInit {
  @Output() valueChange = new EventEmitter();
  @Input() pokeInfo: any;
  pokemon = {
    abilities: [],
    name: "",
    moves: [],
    stats: [],
    types: [],
    id:0
  };
  imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  panelOpenState = false;
  moveArray = [];
  abilityArray = [];


  constructor(private PokedexService: PokedexService, private _snackBar: MatSnackBar) { }
  close() {
    this.valueChange.emit('close');
  }
  catch(pokemon) {
    const flag = this.PokedexService.addCatchToList({ ...pokemon, name: this.pokemon.name });
    var msg = "";
    flag ? msg ='Added to Catch List!':msg = 'Already in The List!'
      this._snackBar.open(msg, 'close', {
        duration: 2000
      });
  }
  fetchAbilityDescription() {
    let th = this;

    this.pokemon.abilities.forEach((ability) => {
      th.abilityArray.push(axios.get(ability.ability.url));
    })
    axios.all(th.abilityArray).then(axios.spread((...res) => {

      th.abilityArray = res;
      th.abilityArray.forEach(element => {
        element.data.effect_entries = element.data.effect_entries.filter(function (e) {

          return e.language.name === 'en';
        })

      })
    })).catch((err) => {
      if (err.response) {
        this._snackBar.open(err.response.data, 'close', {
          duration: 2000
        });
      } else if (err.request) {
        this._snackBar.open('This Request Could Not Be Completed', 'close', {
          duration: 2000
        });
      } else {
        this._snackBar.open('Uh Oh, Something Went Wrong. Please Try Again', 'close', {
          duration: 2000
        });
      }
    })
  }
  fetchMoveDescription() {
    let th = this;
    let arr = [];
    this.pokemon.moves.forEach((move) => {
      arr.push(axios.get(move.move.url));
    })
    axios.all(arr).then(axios.spread((...res) => {
      th.moveArray = res;

    })).catch((err) => {
      if (err.response) {
        this._snackBar.open(err.response.data, 'close', {
          duration: 2000
        });
      } else if (err.request) {
        this._snackBar.open('This Request Could Not Be Completed', 'close', {
          duration: 2000
        });
      } else {
        this._snackBar.open('Uh Oh, Something Went Wrong. Please Try Again', 'close', {
          duration: 2000
        });
      }
    })
  }
  ngOnInit(): void {

  }
  ngOnChanges() {
    axios({
      url: this.pokeInfo.pokemon
    }).then((res) => {
      this.pokemon = res.data;

      this.fetchAbilityDescription();
      this.fetchMoveDescription();
      // console.log(res.data);
    }).catch((err) => {
      if (err.response) {
        this._snackBar.open(err.response.data, 'close', {
          duration: 2000
        });
      } else if (err.request) {
        this._snackBar.open('This Request Could Not Be Completed', 'close', {
          duration: 2000
        });
      } else {
        this._snackBar.open('Uh Oh, Something Went Wrong. Please Try Again', 'close', {
          duration: 2000
        });
      }
    })
  }

}
