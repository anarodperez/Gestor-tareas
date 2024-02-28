import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service'; // Asegúrate de que la ruta sea correcta
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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

  constructor(private authService: AuthService) { }

  login() {
    console.log("Intentando iniciar sesión");
    const loginData = {
      email: this.email,
      password: this.password
    };
    console.log(loginData);
    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        console.log('Inicio de sesión exitoso', response);
        // Aquí podrías redirigir al usuario o guardar el token en el almacenamiento local
      },
      error: (error: any) => {
        console.error('Error en el inicio de sesión', error);
        // Aquí puedes manejar errores, como mostrar un mensaje al usuario
      }
    });
  }
}
