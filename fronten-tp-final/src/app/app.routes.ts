import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { FormAlquilerComponent } from './components/alquiler/form-alquiler/form-alquiler.component';
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent},
    { path : 'login', component: LoginComponent},
    // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    // { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
    // { path: '**', redirectTo: 'home', pathMatch: 'full' },
    { path : 'formAlquilerComponent', component: FormAlquilerComponent}
];
