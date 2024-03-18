import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service'; // Asegúrate de que la ruta sea correcta
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Asegúrate de que 'styleUrls' esté en plural y corrija la ruta si es necesario
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading = false; // Variable para rastrear el estado de carga
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.isLoading = true; // Iniciar el indicador de carga
    const loginData = {
      email: this.email,
      password: this.password
    };
    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        // Guardar el token en el almacenamiento local si es necesario
        localStorage.setItem('authToken', response.authToken);
        // Almacenar el nombre del usuario en localStorage
        localStorage.setItem('userName', response.user.name);

        this.isLoading = false; // Detener el indicador de carga

        // Redirigir al dashboard
        this.router.navigate(['/dashboard']); // Usa el método 'navigate' para redirigir
      },
      error: (error) => {
        this.errorMessage = 'Credenciales incorrectas. Por favor, intentalo de nuevo.';
        this.isLoading = false; // Detener el indicador de carga
      }
    });
  }


  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
