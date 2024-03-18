import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavbarComponent, RouterLink], // RouterLink removido de aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corregido a styleUrls en forma de arreglo
})
export class AppComponent {
  title = 'frontend';
}
