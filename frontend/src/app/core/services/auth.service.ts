import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

import { AuthLogin, User, AuthResponse } from './../models/user.model'; // Asegúrate de que AuthResponse incluya todos los campos necesarios.

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${this.baseUrl}/api`;

  constructor(
    private http: HttpClient,
    @Inject('API_BASE_URL') private baseUrl: string,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  private saveUserData(userData: AuthResponse): void {
    const authData = { ...userData, timestamp: new Date().getTime() };
    sessionStorage.setItem('auth_data', JSON.stringify(authData));
  }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap((response: any) => {
        // Aquí puedes manejar la respuesta del servidor, como guardar datos del usuario recién registrado si es necesario
        console.log('User successfully registered:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        // Aquí manejas los errores que puedan ocurrir durante el registro
        let errorMsg = 'Ocurrió un error durante el registro.';
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente o de red
          errorMsg = `Error: ${error.error.message}`;
        } else {
          // El backend devolvió un código de respuesta no exitoso
          // El cuerpo de la respuesta puede contener pistas sobre lo que salió mal
          errorMsg = `Error del servidor: ${error.status}\nMensaje: ${error.message}`;
        }
        console.error(errorMsg);
        // Puedes optar por transformar el error en algo más amigable para el usuario
        return throwError(() => new Error('El registro ha fallado; por favor, inténtalo de nuevo más tarde.'));
      })
    );
  }


  login(credentials: AuthLogin): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        this.saveUserData(response);
        this.router.navigate(['/dashboard']); // Ajusta según la ruta deseada post-login
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'Ocurrió un error al iniciar sesión.';
        if (error.status === 401) {
          errorMsg = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const userDataString = sessionStorage.getItem('auth_data');
      if (userDataString) {
        const authData = JSON.parse(userDataString);
        const tenHoursInMilliseconds = 10 * 60 * 60 * 1000; // 10 horas en milisegundos
        const currentTime = new Date().getTime();
        const dataCreationTime = authData.timestamp || 0;
        return currentTime - dataCreationTime < tenHoursInMilliseconds;
      }
    }
    return false;
  }

  getUserData(): any {
    const userDataString = sessionStorage.getItem('auth_data'); // O localStorage, dependiendo de dónde guardes los datos
    if (userDataString) {
      return JSON.parse(userDataString);
    }
    return null;
  }

  getUserName(): string | null {
    const userData = this.getUserData();
    console.log(userData);
    // Accede a la propiedad 'name' dentro del objeto 'user'
    return userData ? userData.user.name : null;
  }



  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession(),
    });
  }

  private clearSession(): void {
    sessionStorage.removeItem('auth_data');
    this.router.navigate(['/auth/login']); // Asegúrate de que esta ruta exista en tu configuración de rutas.
  }
}
