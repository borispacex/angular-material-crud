import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NuevoEstudianteComponent } from './components/dashboard/nuevo-estudiante/nuevo-estudiante.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'nuevo', component: NuevoEstudianteComponent},
    {path: 'actualizar/:id', component: NuevoEstudianteComponent},
    {path: '**', redirectTo: '/login'}
];
