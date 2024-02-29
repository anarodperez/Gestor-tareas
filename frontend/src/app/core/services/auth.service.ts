import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials, User } from '../models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, @Inject('API_BASE_URL') private baseUrl: string) { }

  register(user: User) {
    return this.http.post(`${this.baseUrl}/api/register`, user);
  }

  login(credentials: LoginCredentials) {
    return this.http.post(`${this.baseUrl}/api/login`, credentials).pipe(
      tap((response: any) => {
        // Suponiendo que la respuesta del servidor incluye un token en response.token
        // Guarda el token en sessionStorage
        sessionStorage.setItem('auth_data', JSON.stringify(response.token));
      })
    );
  }

  // Para comprobar si está logueado
  isAuthenticated(): boolean {
    return sessionStorage.getItem('auth_data') !== null;
  }

  // Método para cerrar sesión
  logout() {
    // Elimina los datos de autenticación de sessionStorage
    sessionStorage.removeItem('auth_data');
  }
}
