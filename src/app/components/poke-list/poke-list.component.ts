import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { PokedexService } from '../../service/pokedex.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {
  limit = 9999;
  url = "https://pokeapi.co/api/v2/pokemon";
  imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  pokeList = [];
  keyword = [];
  search = "";
  pokeInfo = {};
  constructor(private PokedexService: PokedexService, private _snackBar: MatSnackBar) { }

  viewInfo(pokemon, id) {
    this.pokeInfo = {
      pokemon: pokemon,
      id: id
    };
  }
  catch(pokemon) {
    const flag = this.PokedexService.addCatchToList({ id: pokemon.id, name: pokemon.name, url: pokemon.url });
    var msg = "";
    flag ? msg ='Added to Catch List!':msg = 'Already in The List!'
      this._snackBar.open(msg, 'close', {
        duration: 2000
      });
  }

  handleClose($event) {
    if ($event === 'close') {
      this.pokeInfo = {};
    }
  }
  handleInfo($event) {
    const pokemon = {
      pokemon: $event.url,
      id: $event.id
    }
    this.pokeInfo = pokemon;
  }
  searchKeyword() {

    if (!this.search) {
      this.keyword = this.pokeList;
    }
    let query = this.search.toLowerCase();
    this.keyword = this.pokeList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query)
    );

  }
  onImgError($event, i) {
    $event.target.src = this.imageUrl + "0.png";
    this.pokeList[i].id = 0;
  }
  isEmptyObject(obj) {

    return (obj && (Object.keys(obj).length === 0));
  }
  fetchPokemonList() {
    axios({
      url: this.url + "?limit=" + this.limit
    }).then((res) => {
      this.pokeList = this.keyword = res.data.results;
      this.pokeList.forEach((poke, i) => {
        poke.id = i + 1;
      })
    }).catch((err) => {
      if(err.response){
        this._snackBar.open(err.response.data,'close',{
          duration:2000
        });
      }else if(err.request){
        this._snackBar.open('This Request Could Not Be Completed','close',{
          duration:2000
        });
      }else{
        this._snackBar.open('Uh Oh, Something Went Wrong. Please Try Again','close',{
          duration:2000
        });
      }
    })
  }
  ngOnInit(): void {
    this.fetchPokemonList();

  }

}
