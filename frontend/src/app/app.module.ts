import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './pages/components/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './pages/layout/layout.module';
import { LoginComponent } from './pages/components/login/login.component';
import { RegisterComponent } from './pages/components/register/register.component';
import { AuthInterceptor } from './pages/services/auth.interceptor';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProduitComponent } from './pages/components/produit/produit.component';
import { StockComponent } from './pages/components/stock/stock.component';
import { IndexClientComponent } from './pages/components/index-client/index-client.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClientNavbarComponent } from './pages/components/client-navbar/client-navbar.component';
import { PanierComponent } from './pages/components/panier/panier.component';
import { ClientComponent } from './pages/components/client/client.component';
import { AllProduitComponent } from './pages/components/all-produit/all-produit.component';
import { ProduitDetailComponent } from './pages/components/produit-detail/produit-detail.component';
import { CommandeComponent } from './pages/components/commande/commande.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    ProduitComponent,
    IndexClientComponent,
    ClientNavbarComponent,
    PanierComponent,
    ClientComponent,
    AllProduitComponent,
    ProduitDetailComponent,
    StockComponent,
    CommandeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
    RouterLinkActive,
    NgxPaginationModule,
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
