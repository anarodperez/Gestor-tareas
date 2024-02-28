import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service'; // Asegúrate de que la ruta sea correcta
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Asegúrate de que 'styleUrls' esté en plural y corrija la ruta si es necesario
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    console.log("Intentando iniciar sesión");
    const loginData = {
      email: this.email,
      password: this.password
    };
    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        console.log('Inicio de sesión exitoso', response);
        // Guardar el token en el almacenamiento local si es necesario
        // localStorage.setItem('authToken', response.authToken);

        // Redirigir al dashboard
        this.router.navigate(['/dashboard']); // Usa el método 'navigate' para redirigir
      },
      error: (error: any) => {
        console.error('Error en el inicio de sesión', error);
      }
    });
  }

  logout() {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('authToken');

    // Redirigir al login o a la página de inicio
    this.router.navigate(['/login']);
  }

}
