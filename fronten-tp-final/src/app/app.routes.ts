import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path : 'login', component: LoginComponent}
    // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    // { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
    // { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
