import { Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { AdminGuard } from './admin.guard';
import { StockComponent } from "./components/stock/stock.component";
import { ProduitComponent } from "./components/produit/produit.component";
import { UserComponent } from "./components/user/user.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";


const Routing: Routes = [
  // {
  //   path: 'admin-produit', component: ProduitComponent, canActivate: [AuthGuard, AdminGuard]
  // },
  // {
  //   path: 'admin-user', component: UserComponent, canActivate: [AuthGuard, AdminGuard]
  // },
  // {
  //   path: 'admin-user', component: UserComponent,canActivate: [AuthGuard, AdminGuard]
  // },

  // {
  //   path:'admin-stock', component:StockComponent,canActivate: [AuthGuard, AdminGuard]
  // },
  
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent, },

  // client routes 
  // {
  //   path: 'client', component: ClientComponent, children: [
  //     {
  //       path: '', component: IndexClientComponent,
  //     },
  //     {
  //       path: 'panier', component: PanierComponent,
  //     },
  //   ]
  // },




  // error routes
  {
    path: '**',
    redirectTo: 'error/404',
  },

]

export { Routing };