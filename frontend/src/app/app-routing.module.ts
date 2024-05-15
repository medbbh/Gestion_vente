import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/components/login/login.component';
import { RegisterComponent } from './pages/components/register/register.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { IndexClientComponent } from './pages/components/index-client/index-client.component';
import { AuthGuard } from './pages/auth.guard';
import { ClienGuard } from './pages/client.guard';
import { AdminGuard } from './pages/admin.guard';
import { ClientComponent } from './pages/components/client/client.component';
import { PanierComponent } from './pages/components/panier/panier.component';
import { AllProduitComponent } from './pages/components/all-produit/all-produit.component';
import { ProduitDetailComponent } from './pages/components/produit-detail/produit-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/client', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, },
  { path: 'dashbord', component: LayoutComponent, canActivate: [AuthGuard, AdminGuard] },
  {
    path: 'client', component: ClientComponent, children: [
      {
        path: '', component: IndexClientComponent,
      },
      {
        path: 'produit', component: AllProduitComponent,
      },
      {
        path: 'produit-detail/:id', component: ProduitDetailComponent,
      },
      {
        path: 'panier', component: PanierComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
