import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProduitComponent } from "./components/produit/produit.component";

const Routing: Routes = [

    {
      path:'',
      component:HomeComponent
    },
    {
        path:'home',
        component:HomeComponent
      },
      {
        path:'produit', component:ProduitComponent
      },

    {
        path: '**',
        redirectTo: 'error/404',
    },

]

export { Routing };