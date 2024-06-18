import { ChangeDetectorRef, Component } from '@angular/core';
import { Commande } from '../../interfaces/commande';
import { Produit } from '../../interfaces/produit';
import { PanierService } from '../../services/panier.service';
import { CommandeService } from '../../services/commande.service';
import { ServiceService } from '../../services/service.service';
import { HttpResponse } from '@angular/common/http';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-commande',
  templateUrl: './admin-commande.component.html',
  styleUrls: ['./admin-commande.component.css']
})
export class AdminCommandeComponent {

  faCircleCheck = faCircleCheck
  pages: number = 1;
  commandes: any[] = [];
  produitsMap: { [key: number]: Produit } = {}; // Map to store fetched products
  isLoading: boolean = true

  constructor(private cdr: ChangeDetectorRef,private commandeService: CommandeService, private produitService: ServiceService) { }
  ngOnInit(): void {
    this.fetchCommandes();
  }
  fetchCommandes() {
    this.commandeService.listCommande().subscribe((response: HttpResponse<Commande[]>) => {
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

  statusUpdate(id: any) {
    this.commandeService.statusUpdate(id).subscribe(
      () => {
        // Find the updated commande and refresh the specific column
        const updatedCommande = this.commandes.find(commande => commande.id === id);
        if (updatedCommande) {
          updatedCommande.statut = this.getUpdatedStatus(updatedCommande.statut);
          this.cdr.detectChanges(); 
        }
      }
    );
  }

  getUpdatedStatus(currentStatus: string): string {
    // Implement the logic to get the next status based on the current status
    switch (currentStatus) {
      case 'en attente':
        return 'preparation de la commande';
      case 'preparation de la commande':
        return 'commande en route';
      case 'commande en route':
        return 'livré';
      default:
        return currentStatus;
    }
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
