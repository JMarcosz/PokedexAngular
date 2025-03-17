import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  // Obtiene una lista de Pokémon (por ejemplo, los primeros 100)
  getPokemonList(limit: number = 100): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon?limit=${limit}`);
  }

  getPokemonDescription(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon-species/${id}`);
  }
  // Obtiene un Pokémon específico por ID
  getPokemonById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${id}`);
  }

  getPokemonByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${name}`);
  }

  // Obtiene detalles adicionales, por ejemplo, la especie de un Pokémon
  getPokemonSpecies(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon-species/${id}`);
  }

  // Puedes agregar más métodos según lo que necesites de la API
}
