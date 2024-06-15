import { Component, OnInit } from '@angular/core';
import { Produit } from '../../interfaces/produit';
import { Panier } from '../../interfaces/panier';
import { PanierService } from '../../services/panier.service';
import { ServiceService } from '../../services/service.service';
import { HttpResponse } from '@angular/common/http';
import { CommandeService } from '../../services/commande.service';
import { Commande } from '../../interfaces/commande';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  carts: Panier[] = [];
  prixTotal: number = 0;
  showAlert = false;
  userId:number
  montant:any

  constructor(private panierService: PanierService, private produitService: ServiceService, private commandeService: CommandeService, private router: Router) { 
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit(): void {
    this.loadCartFromLocalStorage();
    this.getMontant(this.userId)
    
  }

  getMontant(userId:any){
    this.commandeService.getMontant(userId).subscribe((response) => {
      this.montant = response.body[0].montant;
      console.log('Montant:', this.montant);
    },
    (error) => {
      console.error('Error fetching montant:', error);
    })
  }


  loadCartFromLocalStorage(): void {
    const storedObject = localStorage.getItem('cart');
    if (storedObject) {
      this.carts = JSON.parse(storedObject) as Panier[];
      this.calculateTotal();
    }
  }

  calculateTotal(): void {
    this.prixTotal = 0;
    this.carts.forEach(item => {
      this.prixTotal += item.prix * item.quantite;
    });
  }

  augmenterQuantite(cart: Panier): void {
    cart.quantite += 1;
    this.updateCart();
  }

  diminuerQuantite(cart: Panier): void {
    if (cart.quantite > 1) {
      cart.quantite -= 1;
      this.updateCart();
    }
  }

  updateCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.carts));
    this.calculateTotal();
  }

  deleteproduct(id: number): void {
    this.panierService.removeFromCart(id);
    this.carts = this.carts.filter(cart => cart.id !== id);
    this.updateCart();
  }

  commander(cart: Panier): void {
    if (localStorage.getItem("auth_token")) {
    const commande: Commande = {
    client_id: Number(localStorage.getItem("userId")),
    product_id: cart.id,
    quantite: cart.quantite,
    montant_total: cart.prix * cart.quantite
    };
    this.commandeService.placeOrder(commande).subscribe(response => {
    this.showAlert = true;
    this.deleteproduct(cart.id)
    
        if (this.showAlert) {
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 2000);
        }
      }, error => {
        console.error('Error placing order:', error);
      });
    
    }
    else {
      this.router.navigate(['login'])
    }
  }

  commandeAll(): void {
    if (localStorage.getItem('auth_token')) {
      this.carts.forEach(cart => {
        this.commander(cart);
      });
    } else {
      this.router.navigate(['login']);
    }
  }
}
