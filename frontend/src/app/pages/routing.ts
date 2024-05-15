import { Routes } from "@angular/router";
import { ProduitComponent } from "./components/produit/produit.component";
import { UserComponent } from "./components/user/user.component";
import { IndexClientComponent } from "./components/index-client/index-client.component";
import { AuthGuard } from "./auth.guard";
import { AdminGuard } from './admin.guard';
import { ClienGuard } from "./client.guard";
import { PanierComponent } from "./components/panier/panier.component";
import { ClientComponent } from "./components/client/client.component";

const Routing: Routes = [
  {
    path: 'admin-produit', component: ProduitComponent, canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin-user', component: UserComponent, canActivate: [AuthGuard, AdminGuard]
  },


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