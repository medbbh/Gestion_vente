import { Component } from '@angular/core';
import { Produit } from '../../interfaces/produit';
import { ServiceService } from '../../services/service.service';
import { HttpResponse } from '@angular/common/http';
import { PanierService } from '../../services/panier.service';
import { Panier } from '../../interfaces/panier';
import { CommandeService } from '../../services/commande.service';
import { Commande } from '../../interfaces/commande';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-produit',
  templateUrl: './all-produit.component.html',
  styleUrls: ['./all-produit.component.css']
})
export class AllProduitComponent {

  pages: number = 1;
  produits: Produit[] = [];
  cart: Panier[] = []
  showAlert = false;
  showAlertSuccess=false
  showAlertCommande=false
  soldeAlert = false

  ngOnInit(): void {
    this.fetchProduits();
    this.cart = this.panierService.getCartItems();
  }

  constructor(private panierService: PanierService,private produitService: ServiceService,private commandeService : CommandeService,private router:Router) { }

    closeModal() {
    this.soldeAlert = false
  }
  fetchProduits() {
    this.produitService.listProduit().subscribe((response: HttpResponse<Produit[]>) => {
      const data: Produit[] = response.body || [];
      this.produits = data;
    });
  }
  addToCart(id: number): void {
    

    this.produitService.produitById(id).subscribe((response: HttpResponse<Produit>) => {
      const data: Produit | null = response.body;
      if (data !== null) {
        // Check if the product is already in the cart using PanierService
        const productExists = this.cart.some(item => item.id === id);

        if (productExists) {
          this.showAlert = true;
        } else {
          this.panierService.addToCart(data);
          this.cart = this.panierService.getCartItems(); // Sync local cart with service
          this.showAlertSuccess = true
        }
      } else {
        console.error("Produit not found");
      }

      if (this.showAlert) {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
      }
      if (this.showAlertSuccess) {
        this.showAlertSuccess = true;
        setTimeout(() => {
          this.showAlertSuccess = false;
        }, 2000);
      }
    });
  }

  commander(produit: Produit): void {
    if (localStorage.getItem("auth_token")) {
      const commande: Commande = {
        client_id: Number(localStorage.getItem("userId")),
        product_id: produit.id,
        quantite: 1,
        montant_total: produit.prix
      };
      this.commandeService.placeOrder(commande).subscribe(response => {
        this.commandeService.payer(produit.prix, Number(localStorage.getItem("userId"))).subscribe(
          paymentResponse => {
            // Payment succeeded, now show alert and remove product
            this.showAlertCommande = true;
            if (this.showAlertCommande) {
              this.showAlertCommande = true;
              setTimeout(() => {
                this.showAlertCommande = false;
              }, 2000);
            }
          },
          paymentError => {
            // Handle payment error
            this.soldeAlert = true
          }
        );

      }, error => {
        console.error('Error placing order:', error);
      });

    }
    else {
      this.router.navigate(['login'])
    }

  }

  

  
}
