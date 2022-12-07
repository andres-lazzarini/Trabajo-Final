import { PokemonsService } from './../../_services/pokemons.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit{

  public pokemonDetails: any = [];
  public pokemonName: any;
  public url: string = '';
  public id: any;

  constructor(
    private route: ActivatedRoute,
    private servPokemons: PokemonsService) {}

    ngOnInit(): void {

      this.route.paramMap.subscribe(paramMap => {
        this.pokemonName = paramMap.get('pokemon');
        this.url = `https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`;

        this.loadData(this.url);
      });
    }

    loadData(url:string){
      this.servPokemons.getPokemonDetails(url).subscribe(resp => {
        this.pokemonDetails = resp;
        this.id = this.pokemonDetails.id;
        this.pokemonDetails = this.pokemonDetails.stats;
        console.log(this.pokemonDetails);
      });
    }
}
