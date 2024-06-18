import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { Produit } from '../../interfaces/produit';
import { HttpResponse } from '@angular/common/http';
import { faArrowDown, faMobileScreenButton,faFishFins,faBottleWater,faShirt,faCouch } from '@fortawesome/free-solid-svg-icons';
import { PanierService } from '../../services/panier.service';
import { Panier } from '../../interfaces/panier';
import { CommandeService } from '../../services/commande.service';
import { Commande } from '../../interfaces/commande';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-client',
  templateUrl: './index-client.component.html',
  styleUrls: ['./index-client.component.css']
})
export class IndexClientComponent implements OnInit {

  // icons
  faArrowDown = faArrowDown;
  faMobileScreenButton = faMobileScreenButton
  faFishFins = faFishFins
  faBottleWater = faBottleWater
  faShirt = faShirt
  faCouch = faCouch


  produits: Produit[] = [];
  cart: Panier[] = []; // Change to Panier[] to reflect quantity
  showAlert = false;
  showAlertSuccess=false
  showAlertCommande=false
  product_id: any
  montant_total: any
  soldeAlert = false

  constructor(private panierService: PanierService, private produitService: ServiceService, private commandeService: CommandeService,private router: Router) { }

  ngOnInit(): void {
    this.fetchProduits();
    this.cart = this.panierService.getCartItems(); // Initialize cart from PanierService
  }
  
  closeModal() {
    this.soldeAlert = false
  }

  fetchProduits() {
    this.produitService.mostSold().subscribe((response: HttpResponse<Produit[]>) => {
      const data: Produit[] = response.body || [];
      this.produits = data;
    });
  }

  addToCart(id: number): void {
    let showAlert = false;

    this.produitService.produitById(id).subscribe((response: HttpResponse<Produit>) => {
      const data: Produit | null = response.body;
      if (data !== null) {
        // Check if the product is already in the cart using PanierService
        const productExists = this.cart.some(item => item.id === id);

        if (productExists) {
          showAlert = true;
        } else {
          this.panierService.addToCart(data);
          this.cart = this.panierService.getCartItems();
          this.showAlertSuccess = true
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

  getProductId(id: any) {
    this.produitService.produitById(id).subscribe((data) => {
      this.montant_total = data.body?.prix
    })
  }

  placeOrder(data: { product_id: number, montant_total: number }) {
    if (localStorage.getItem('auth_token')) {
      let client_id =  Number(localStorage.getItem("userId")) ;
      let quantite = 1
      let orderData: Commande = {
        ...data,
        quantite,
        client_id,
      }
      console.log(data.montant_total)
      this.commandeService.placeOrder(orderData).subscribe(() => {
        this.commandeService.payer(data.montant_total, Number(localStorage.getItem("userId"))).subscribe(
          paymentResponse => {
        this.showAlertCommande = true;

          },
          paymentError => {
            // Handle payment error
            this.soldeAlert = true
          }
        );

        if (this.showAlertCommande) {
          this.showAlertCommande = true;
          setTimeout(() => {
            this.showAlertCommande = false;
          }, 2000);
        }
      })
      // console.log(data)
    }
    else {
      this.router.navigate(['login'])
    }
  }

}
