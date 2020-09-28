import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  catchList = [];
  constructor() { }

  addCatchToList(pokemon){
    if(!this.catchList.some(e=>e.name===pokemon.name)){
      this.catchList.push({...pokemon,caught:false});
      return true;
    }else{
      return false;
    }

  }
  removeCatchFromList(i){
    this.catchList.splice(i,1);
  }
  retrieveList(){
    return this.catchList;
  }
  catch(i){
    this.catchList[i].caught = !this.catchList[i].caught;
    return this.catchList[i].caught;
  }
}
