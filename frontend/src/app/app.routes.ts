import { Routes } from '@angular/router';
import { loggedGuard } from './core/guards/logged.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './shared/components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // Define HomeComponent como la página inicial
  },

     //*---------------
  // Login, logout y Register
  //*---------------
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES),
    canActivate: [loggedGuard] // Suponiendo que quieres proteger estas rutas con el guardia
  },

  {
    path: 'home',
    redirectTo: '', // Redirige /home a la ruta raíz, que muestra HomeComponent
    pathMatch: 'full' // Asegura que la redirección ocurra solo cuando la ruta sea exactamente '/home'
  },
  {
    path: 'dashboard',
    component: DashboardComponent, // Asigna directamente el componente aquí
    canActivate: [loggedGuard]
  },

];
