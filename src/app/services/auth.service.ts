import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
    // Guarda las credenciales por defecto si no están en localStorage
    if (!localStorage.getItem('credentials')) {
      const defaultCredentials = {
        username: 'jeanmarte22@gmail.com',
        password: '1234'
      };
      localStorage.setItem('credentials', JSON.stringify(defaultCredentials));
    }
  }

  // Valida las credenciales comparándolas con las almacenadas
  login(username: string, password: string): boolean {
    const storedCredentials = localStorage.getItem('credentials');
    if (storedCredentials) {
      const credentials = JSON.parse(storedCredentials);
      if (username === credentials.username && password === credentials.password) {
        localStorage.setItem('userToken', 'true'); // Guarda el flag de autenticación
        this.router.navigate(['/']);  // Redirige a la ruta raíz
        return true;
      }
    }
    return false;
  }

  // Elimina el flag de autenticación y redirige al login
  logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('userToken') !== null;
  }
}
