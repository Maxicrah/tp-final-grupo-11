import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { FormAlquilerComponent } from './components/alquiler/form-alquiler/form-alquiler.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './website/auth/login/login.component';
import { RegisterComponent } from './website/auth/register/register.component';
import { DuenioDashboardComponent } from './components/duenio-dashboard/duenio-dashboard.component';
import { LocalFormComponent } from './components/local/local-form/local-form.component';
import { AboutComponent } from './website/about/about.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PropietarioDashboardComponent } from './components/propietario-dashboard/propietario-dashboard.component';
import { PagoComponent } from './components/pago/pago.component';
import { LocalesDisponiblesComponent } from './components/local/locales-disponibles/locales-disponibles.component';
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], children: [
      { path: 'local-form', component: LocalFormComponent},
    ]},
    { path: 'propietario-dashboard', component: PropietarioDashboardComponent, canActivate: [AuthGuard], children: [
      { path: 'alquiler-form', component: FormAlquilerComponent },
      { path: 'pago-form', component: PagoComponent },
      { path: 'locales-disponibles', component: LocalesDisponiblesComponent },

    ]},
    { path : 'login', component: LoginComponent},
    { path: 'registro', component: RegisterComponent},
    { path: 'duenio-dashboard', component: DuenioDashboardComponent, canActivate: [AuthGuard], children: [
        { path: 'alquiler-form', component: FormAlquilerComponent },
        { path: 'local-form', component: LocalFormComponent},
        { path: 'post-form', component: PostFormComponent},
        { path: 'pago-form', component: PagoComponent }
      ]},
    { path: 'about', component: AboutComponent},
    
    // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    // { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
    // { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
