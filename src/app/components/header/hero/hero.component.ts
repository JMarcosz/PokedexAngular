import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { CustomUppercasePipe } from '../../../pipes/custom-upper-case.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CustomUppercasePipe, CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  // Declaramos la variable para almacenar el JSON recibido (no es observable)
  pokemon: any;
  pokemonDescription: any;
  pokemonType: any;
  constructor(private apiService: ApiService) { }

  getRandomPokemon(): Observable<any[]> {

    const randomId = Math.floor(Math.random() * 151) + 1;
    return this.apiService.getPokemonById(randomId);
  }
  getAllDescription(id: number): Observable<any[]> {
    return this.apiService.getPokemonDescription(id);
  }
  getPokemonType(): Observable<any> {
    this.apiService.getPokemonType().subscribe((data: any) => {
      this.pokemonType = data.results;
    })
    return this.pokemonType;
  }
  viewRandomPokemon() {
    this.getRandomPokemon().subscribe(data => {
      this.pokemon = data;
      this.getAllDescription(this.pokemon.id).subscribe((data: any) => {
        const descripcionEs = data.flavor_text_entries.find((entry: any) => entry.language.name === 'es');
        const descripcionEn = data.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
        return this.pokemonDescription = descripcionEs ? descripcionEs.flavor_text : descripcionEn.flavor_text;
      })
      console.log(this.pokemon); // Ahora podrás ver el JSON completo

    });
  }
  ngOnInit(): void {
    this.viewRandomPokemon();
    this.getPokemonType();
  }
}
