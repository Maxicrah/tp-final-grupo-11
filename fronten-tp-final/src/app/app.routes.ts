import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { DuenioDashboardComponent } from './components/duenio-dashboard/duenio-dashboard.component';
import { UsuarioCrudComponent } from './components/usuario-crud/usuario-crud.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent},
    { path: 'duenio-dashboard', component: DuenioDashboardComponent},
    { path: 'usuario-crud', component: UsuarioCrudComponent},
    { path: 'usuario-form', component: UsuarioFormComponent},
    { path: 'usuario-form/:id', component: UsuarioFormComponent},
    { path : 'login', component: LoginComponent}
    // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    // { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
    // { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
