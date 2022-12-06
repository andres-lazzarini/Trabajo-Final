import { PokemonService } from './../../../_global/_services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../../_services/filter.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  public pokemons: any = [];
  public typeName: any;
  public url: any;

  constructor(
    private route: ActivatedRoute,
    private filterService:FilterService,
    private pokemonService: PokemonService,
    ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(paramMap => {
      this.typeName = paramMap.get('type');
      this.url = `https://pokeapi.co/api/v2/type/${this.typeName}`;

      this.loadData(this.url);
    });

  }

  loadData(url:string){
    this.filterService.getTypePokemons(url).subscribe(resp => {
      this.pokemons = resp;
      this.pokemons = this.pokemons.pokemon;
      console.log(this.pokemons);
    });
  }

  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }

}
