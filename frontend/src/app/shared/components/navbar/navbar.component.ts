import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';// Asegúrate de importar AuthService correctamente

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule], // Necesario para *ngIf
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // isAuthenticated ya no es necesario como propiedad ya que lo obtendremos directamente del servicio

  constructor(private authService: AuthService) {}

  // Usamos un getter para obtener el estado de autenticación directamente del servicio
  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    // Aquí puedes añadir cualquier lógica adicional después del cierre de sesión, como redireccionar al usuario
  }
}
