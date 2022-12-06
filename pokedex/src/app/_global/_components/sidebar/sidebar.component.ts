import { PokemonService } from './../../_services/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public pokeTypeList: any = [];

  constructor(private pokeService: PokemonService) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.pokeService.getPokemonTypes('https://pokeapi.co/api/v2/')
    .subscribe(res => {
      this.pokeTypeList = res;
      this.pokeTypeList = this.pokeTypeList.results;
      console.log(res);
    });
  }

}
