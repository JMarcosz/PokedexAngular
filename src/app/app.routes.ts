// AppRoute.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

    {
        path: '',
        canActivate: [AuthGuard],
        loadComponent: () => import('./layouts/home/home.component').then(m => m.HomeComponent)
    },

    {
        path: 'login',
        loadComponent: () => import('./layouts/login/login.component').then(m => m.LoginComponent)
    }

];
