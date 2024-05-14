import { Routes } from "@angular/router";
import { IndexClientComponent } from "./components/index-client/index-client.component";
import { AuthGuard } from "./auth.guard";
import { AdminGuard } from './admin.guard';
import { ClienGuard } from "./client.guard";
import { StockComponent } from "./components/stock/stock.component";
import { HomeComponent } from "./components/home/home.component";
import { ProduitComponent } from "./components/produit/produit.component";
import { UserComponent } from "./components/user/user.component";


const Routing: Routes = [

  // {
  //   path: '', component: HomeComponent

  // },
  {
    path: 'admin-home', component: HomeComponent,canActivate: [AuthGuard, AdminGuard]

  },
  {
    path: 'admin-produit', component: ProduitComponent,canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin-user', component: UserComponent,canActivate: [AuthGuard, AdminGuard]
  },

  {
    path:'admin-stock', component:StockComponent,canActivate: [AuthGuard, AdminGuard]
  },
 

  // client routes 
  {
    path: '', component: IndexClientComponent, canActivate: [AuthGuard,ClienGuard]
  },



  // error routes
  {
    path: '**',
    redirectTo: 'error/404',
  },

]

export { Routing };