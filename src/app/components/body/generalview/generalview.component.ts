import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { CustomUppercasePipe } from '../../../pipes/custom-upper-case.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generalview',
  imports: [CustomUppercasePipe, CommonModule],
  templateUrl: './generalview.component.html',
  styleUrls: ['./generalview.component.css'],
})
export class GeneralviewComponent implements OnInit {
  // Listas completas de Pokémon y descripciones
  pokemonList$: any[] = [];
  pokemonDescription: any[] = [];
  request$: any[] = [];
  pokemonSearch: any;
  pokemonType: any;
  PokemonByTypes: any[] = [];
  toglee: boolean = false;
  // Paginación
  currentPage: number = 1;
  pageSize: number = 9;

  constructor(private apiService: ApiService) { }

  getByTypes(tipo: string) {
    this.PokemonByTypes = [];
    this.getAllPokemon().subscribe(data => {
      this.pokemonList$ = data;
      this.PokemonByTypes = this.pokemonList$.filter((pokemon: any) => {
        return pokemon.types.some((t: any) => t.type.name === tipo);
      });
      this.pokemonList$ = this.PokemonByTypes;
    });

  }

  getPokemonType(): Observable<any> {
    this.apiService.getPokemonType().subscribe((data: any) => {
      this.pokemonType = data.results;
    })
    return this.pokemonType;
  }
  getAllPokemon(): Observable<any[]> {
    const requests = [];
    for (let i = 1; i <= 151; i++) {
      requests.push(this.apiService.getPokemonById(i));
    }
    return forkJoin(requests);
  }

  getAllDescription(): Observable<any[]> {
    const requests = [];
    for (let i = 1; i <= 151; i++) {
      requests.push(this.apiService.getPokemonDescription(i));
    }
    return forkJoin(requests);
  }

  buscarPokemon(searchTerm: string): void {
    if (searchTerm != '') {
      this.apiService.getPokemonByName(searchTerm).subscribe((data: any) => {
        // Convertimos la respuesta a array de un solo elemento
        this.pokemonList$ = [data];
        // Reiniciamos la paginación
        this.currentPage = 1;
        if(!this.apiService.getPokemonByName(searchTerm)){
          console.log("Error")
        }
      });
      
    } else {
      this.getAllPokemon().subscribe(data => {
        this.pokemonList$ = data;
        // Reiniciamos la paginación
        this.currentPage = 1;
      });
    }
  }

  // Getter que retorna la lista de Pokémon de la página actual
  get pagedPokemonList() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.pokemonList$.slice(startIndex, endIndex);
  }

  // Total de páginas
  get totalPages() {
    return Math.ceil(this.pokemonList$.length / this.pageSize);
  }

  // Array de números para iterar en la plantilla y mostrar botones de página
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Navegar a la siguiente página
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Navegar a la página anterior
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Establecer la página actual
  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  verTodos(){
    this.getAllPokemon().subscribe(data => {
      this.pokemonList$ = data;
    });
  }
  ngOnInit(): void {
    this.verTodos();
    this.getPokemonType();
    this.getAllDescription().subscribe(data => {
      this.request$ = data;
      this.request$.forEach((pokemon: any) => {
        // Suponemos que el arreglo se llama flavor_text_entries
        const descripcionEs = pokemon.flavor_text_entries.find((entry: any) => entry.language.name === 'es');
        this.pokemonDescription.push(descripcionEs ? descripcionEs.flavor_text : "No se encontro una descrpcion para este pokemon");
      });
    });
  }
}
