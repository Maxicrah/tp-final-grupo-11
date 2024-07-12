import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { FormAlquilerComponent } from './components/alquiler/form-alquiler/form-alquiler.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './website/auth/login/login.component';
import { RegisterComponent } from './website/auth/register/register.component';
import { ListAlquilerComponent } from './components/alquiler/list-alquiler/list-alquiler.component';
import { ListaPagosComponent } from './components/pago/lista-pagos/lista-pagos.component';
import { ListAlquilerPropietarioComponent } from './components/alquiler/list-alquiler-propietario/list-alquiler-propietario.component';
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard]},
    { path : 'login', component: LoginComponent},
    { path: 'registro', component: RegisterComponent},
    // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    // { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
    // { path: '**', redirectTo: 'home', pathMatch: 'full' },
    { path : 'formAlquilerComponent', component: FormAlquilerComponent},
    { path : 'listaAlquilerComponent', component: ListAlquilerComponent},
    { path : 'listaPagoComponent/:id', component: ListaPagosComponent},
    { path : 'listaAlquilerPropietarioComponent', component: ListAlquilerPropietarioComponent}


];
