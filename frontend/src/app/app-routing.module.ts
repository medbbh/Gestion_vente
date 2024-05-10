import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/components/login/login.component';
import { RegisterComponent } from './pages/components/register/register.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { IndexClientComponent } from './pages/components/index-client/index-client.component';
import { AuthGuard } from './pages/auth.guard';
import { ClienGuard } from './pages/client.guard';
import { AdminGuard } from './pages/admin.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, },
  { path: 'dashbord', component: LayoutComponent,canActivate: [AuthGuard,AdminGuard] },
  {
    path: 'client', component: IndexClientComponent, canActivate: [AuthGuard,ClienGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
