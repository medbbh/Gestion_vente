import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { Produit } from '../../interfaces/produit';
import { HttpResponse } from '@angular/common/http';
import { PanierService } from '../../services/panier.service';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Panier, createPanierItem } from '../../interfaces/panier';
import { Commande } from '../../interfaces/commande';
import { CommandeService } from '../../services/commande.service';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.css']
})
export class ProduitDetailComponent {
  // icons
  faPlus = faPlus;
  faminus = faMinus;

  id: any;
  produit: Produit | undefined;
  cart: Produit[] = [];
  showAlert = false;
  showAlertSuccess = false;
  showAlertCommande = false;
  quantite: number = 1;

  constructor(
    private panierService: PanierService,
    private route: ActivatedRoute,
    private produitService: ServiceService,
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.produitService.produitById(this.id).subscribe((response: HttpResponse<Produit>) => {
      this.produit = response.body as Produit;
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
          this.cart = this.panierService.getCartItems();
          this.showAlertSuccess = true; // Sync local cart with service
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
      if (this.showAlertSuccess) {
        this.showAlertSuccess = true;
        setTimeout(() => {
          this.showAlertSuccess = false;
        }, 2000);
      }
    });
  }

  augmenterQuantite(): void {
    this.quantite += 1;
  }

  diminuerQuantite(): void {
    if (this.quantite > 1) {
      this.quantite -= 1;
    }
  }

  deleteproduct(id: any): void {
    this.panierService.removeFromCart(id);
  }

  commander(produit: Produit): void {
    if (localStorage.getItem("auth_token")) {
      const panier: Panier = createPanierItem(produit, this.quantite);

      const commande: Commande = {
        client_id: Number(localStorage.getItem("userId")),
        product_id: panier.id,
        quantite: panier.quantite,
        montant_total: panier.prix * panier.quantite
      };
      
      this.commandeService.placeOrder(commande).subscribe(
        response => {
          this.showAlertCommande = true;
          this.deleteproduct(panier.id);

          setTimeout(() => {
            this.showAlertCommande = false;
          }, 2000);
        },
        error => {
          console.error('Error placing order:', error);
        }
      );
    } else {
      this.router.navigate(['login']);
    }
  }
}
