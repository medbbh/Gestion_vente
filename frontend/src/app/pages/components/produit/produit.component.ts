
import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../../interfaces/produit';
import Swal from 'sweetalert2';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent {

  // font awesome icons 
  faTrash= faTrash;
  faEdit= faEdit;



  pages: number = 1;
  profForm!: FormGroup;
  produits: Produit[] = [];
  showText: boolean = false;
  showButton:boolean = false
  selectedFile: File | null = null;
  isEditing: Produit | null = null;
  
   

  constructor(private fb: FormBuilder, private produitService: ServiceService,private router:Router,private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
    this.fetchProduits();
    this.initializeForm();
  }
  

  fetchProduits() {
    this.produitService.listProduit().subscribe((response: HttpResponse<Produit[]>) => {
      const data: Produit[] = response.body || []; // Extraction du corps de la réponse HTTP
      this.produits = data; // Assurez-vous que les données sont correctement assignées
    });
  }


  onFileSelect(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    this.selectedFile = fileList ? fileList[0] : null;
  }

  initializeForm() {
    this.profForm = this.fb.group({
      name: ['', Validators.required],
      prix: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      image: [null],
    });
  }

  updateForm(produit: Produit) {
    this.isEditing = produit; // Important pour déterminer si on ajoute ou met à jour
    this.profForm.patchValue({
      name: produit.name,
      prix: produit.prix,
      category: produit.category,
      description: produit.description
    });
    this.selectedFile = null; // Réinitialiser le fichier sélectionné

    this.showText = true;
    let ref = document.getElementById('modify');
    ref?.click();
    this.showButton=true
  }

 

  submitForm() {
    const formData = new FormData();
    formData.append('name', this.profForm.get('name')?.value);
    formData.append('prix', this.profForm.get('prix')?.value);
    formData.append('category', this.profForm.get('category')?.value);
    formData.append('description', this.profForm.get('description')?.value);
    if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    if (this.isEditing ) {
      this.updateProduit(this.isEditing.id, formData);
  } else {
      this.addProduits(formData);
  }
}




addProduits(formData: FormData) {
  this.produitService.addProduit(formData).subscribe(
      () => {
        
        Swal.fire({
          title: 'Success',
          text: "Le Produit a été ajouté avec succès",
          icon: 'success',
        });
        this.fetchProduits();
        this.clearForm();
      },
      (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );
  }

  updateProduit(id: number, formData: FormData): void {
    this.produitService.updateProduit(id, formData).subscribe({
      next: (response) => {
  
        // Actualiser les données affichées
        this.fetchProduits(); // Appel pour rafraîchir la liste complète des produits
  
        Swal.fire('Success', 'Le Produit a été modifié avec succès', 'success');
  
        // Réinitialiser le formulaire
        this.clearForm();
      },
      error: (err) => {
        console.error('Failed to update product', err);
        Swal.fire('Error', 'Something went wrong!', 'error');
      }
    });
  }
  
  


  delete(produit: Produit) {
    Swal.fire({
      title: "Supprimer le produit?",
      text: "Êtes-vous sûr de vouloir supprimer ce produit ?",
      showDenyButton: true,
      denyButtonText: `Supprimer`,
      confirmButtonText: "Annuler",
    }).then((result) => {
      if (result.isDenied) {
        this.produitService.delete(produit.id).subscribe(() => {
          this.produits = this.produits.filter(p => p.id !== produit.id);
          Swal.fire("Produit supprimé !");
        });
      }
    });
  }
clearForm() {
  this.isEditing = null;
  this.selectedFile = null;
  this.profForm.reset();
  this.showText = false;
  this.showButton = false;
}
  

}





