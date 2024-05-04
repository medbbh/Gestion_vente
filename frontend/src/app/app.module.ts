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
import { HomeComponent } from './pages/components/home/home.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProduitComponent } from './pages/components/produit/produit.component';
import { StockComponent } from './pages/components/stock/stock.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProduitComponent,
    StockComponent
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
    NgxPaginationModule
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
