import { Routes } from '@angular/router';
import { loggedGuard } from './core/guards/logged.guard';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
  { path: '',
  loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES),
  canActivate: [loggedGuard]
 },
 {
  path: 'dashboard',
  component: DashboardComponent, // Asigna directamente el componente aquí
  canActivate: [loggedGuard]
},

];
