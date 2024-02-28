import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  styleUrls: ['./register.component.css'],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  // Definir las propiedades que se usarán con ngModel
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';


    // Propiedades para almacenar mensajes de error
    errorMessage: string = '';
    fieldErrors: any = {};


  constructor(private authService: AuthService) { }

  registerUser() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
    };
    this.authService.register(userData).subscribe({
      next: (response: any) => {
        console.log('Registro exitoso', response);
      },
      error: (error: any) => {
        console.error('Error en el registro', error);
        if (error.status === 422) {
          // Captura los errores de validación específicos del campo
          this.fieldErrors = error.error.errors || {};
          // Mensaje de error general, si lo prefieres
          this.errorMessage = 'Por favor corrige los errores en el formulario.';
        } else {
          // Otros errores no relacionados con la validación
          this.errorMessage = 'Ocurrió un error durante el registro. Inténtalo de nuevo.';
        }
      }
    });
  }
}
