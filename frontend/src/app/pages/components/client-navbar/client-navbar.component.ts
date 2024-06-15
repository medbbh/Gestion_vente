import { Component } from '@angular/core';
import { Produit } from '../../interfaces/produit';
import { PanierService } from '../../services/panier.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-client-navbar',
  templateUrl: './client-navbar.component.html',
  styleUrls: ['./client-navbar.component.css']
})
export class ClientNavbarComponent {

  carts:Produit[] = []
  cartItemCount: number = 0;
  isLoggedIn = false

  constructor(private panierService: PanierService,private authService:TokenService) {}

  ngOnInit(): void {
    this.panierService.cartItems$.subscribe(count => {
      this.cartItemCount = count;
    });
    this.isLoggedIn = localStorage.getItem('auth_token') ? true : false
  }
  logOut(){
    this.authService.removeToken()
  }
}
