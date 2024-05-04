import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProduitComponent } from "./components/produit/produit.component";
import { UserComponent } from "./components/user/user.component";

const Routing: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'produit', component: ProduitComponent
  },
  {
    path: 'user', component: UserComponent
  },

  {
    path: '**',
    redirectTo: 'error/404',
  },

]

export { Routing };