import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { Produit } from '../../interfaces/produit';
import { HttpResponse } from '@angular/common/http';
import { PanierService } from '../../services/panier.service';
import { faPlus,faMinus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.css']
})
export class ProduitDetailComponent {

  // icons
  faPlus = faPlus
  faminus = faMinus
  
  id:any
  produit:Produit | undefined
  cart: Produit[] = [];
  showAlert = false;

  constructor(private panierService: PanierService,private route:ActivatedRoute,private produitService:ServiceService){}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.produitService.produitById(this.id).subscribe((response: HttpResponse<Produit>) => {

        this.produit = response.body as Produit
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

