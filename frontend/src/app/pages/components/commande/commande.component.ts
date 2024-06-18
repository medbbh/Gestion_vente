import { Component, OnInit } from '@angular/core';
import { Commande } from '../../interfaces/commande';
import { PanierService } from '../../services/panier.service';
import { ServiceService } from '../../services/service.service';
import { HttpResponse } from '@angular/common/http';
import { CommandeService } from '../../services/commande.service';
import { Produit } from '../../interfaces/produit';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  pages: number = 1;
  commandes: any[] = [];
  produitsMap: { [key: number]: Produit } = {}; // Map to store fetched products
  isLoading: boolean = true

  constructor(private panierService: PanierService, private commandeService: CommandeService, private produitService: ServiceService) { }

  ngOnInit(): void {
    this.fetchCommandes(Number(localStorage.getItem('userId')));
  }

  fetchCommandes(id:any) {
    this.commandeService.userCommande(id).subscribe((response: HttpResponse<Commande[]>) => {
      this.commandes = response.body || [];

      // Preload products for all commandes
      this.commandes.forEach(commande => {
        if (!this.produitsMap[commande.product_id]) {
          this.produitService.produitById(commande.product_id).subscribe((produitResponse: HttpResponse<Produit>) => {
            const produit = produitResponse.body;
            if (produit) {
              this.produitsMap[commande.product_id] = produit;
            }
          });
        }
      });
    this.isLoading = false

    });
  }

  getProduitName(productId: number): string {
    const produit = this.produitsMap[productId];
    return produit ? produit.name : '';
  }

  getProduitPrix(productId: number): number {
    const produit = this.produitsMap[productId];
    return produit ? produit.prix : 0;
  }
  getProduitImage(productId: number): string {
    const produit = this.produitsMap[productId];
    return produit ? produit.image : '';
  }
}
