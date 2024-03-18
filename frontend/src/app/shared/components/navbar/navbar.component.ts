import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, // Necesario para directivas comunes como *ngIf, *ngFor, etc.
    RouterModule, // Importa RouterModule aquí para usar routerLink en la plantilla
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getUserName(): string | null {
    return this.authService.getUserName();
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }
}
