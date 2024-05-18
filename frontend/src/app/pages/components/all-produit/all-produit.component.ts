import { Component } from '@angular/core';
import { Produit } from '../../interfaces/produit';
import { ServiceService } from '../../services/service.service';
import { HttpResponse } from '@angular/common/http';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-all-produit',
  templateUrl: './all-produit.component.html',
  styleUrls: ['./all-produit.component.css']
})
export class AllProduitComponent {

  pages: number = 1;
  produits: Produit[] = [];
  cart: Produit[] = [];
  showAlert = false;

  ngOnInit(): void {
    this.fetchProduits();
  }

  constructor(private panierService: PanierService,private produitService: ServiceService) { }

  fetchProduits() {
    this.produitService.listProduit().subscribe((response: HttpResponse<Produit[]>) => {
      const data: Produit[] = response.body || [];
      this.produits = data;
    });
  }
  addToCart(id: any): void {
    let showAlert = false;

    this.produitService.produitById(id).subscribe((response: HttpResponse<Produit>) => {
      const data: Produit | null = response.body;
      if (data !== null) {
        // Check if the product is already in the cart
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === id) {
            showAlert = true;
            break; 
          }
        }

        if (!showAlert) {
          this.panierService.addToCart(data);
          this.cart = this.panierService.getCartItems(); // Sync local cart with service
        }
      } else {
        console.error("Produit not found");
      }

      if (showAlert) {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
      }
    });
  }
}
