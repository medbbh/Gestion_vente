
import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../../interfaces/produit';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent {
  pages: number = 1;
  profForm!: FormGroup;
  produits: Produit[] = [];
  showText: boolean = false;
  selectedProduit: Produit | null = null;
  showButton:boolean = false
  selectedFile: File | null = null;
 
  

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
    if (fileList) {
        this.selectedFile = fileList[0];
    } else {
        this.selectedFile = null;
    }
  }

  initializeForm() {
    this.profForm = this.fb.group({
      name: ['', Validators.required],
      prix: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: null, // Ne pas initialiser avec this.selectedFile
    });
  }

  updateForm(produit: Produit) {
    this.selectedProduit = produit;
    this.updateFormValues(produit);
  }

  updateFormValues(produit: Produit) {
    this.profForm.patchValue({
      id: produit.id,
      name: produit.name,
      prix: produit.prix,
      category: produit.category,
      description: produit.description,
      image: produit.image
    });
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

    if (this.selectedProduit) {
        this.updateProduit(formData);
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

  updateProduit(formData: FormData) {
    if (this.selectedProduit) {
      this.produitService.updateProduit(this.selectedProduit.id, formData).subscribe(
        () => {
          Swal.fire({
            title: 'Success',
            text: "Le Produit a été modifié avec succès",
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
}


  delete(id: Produit){
    Swal.fire({
    title: "Delete Produit? ",
    text: "Confirming will permanently delete the selected file and all associated data . This action cannot be undone.",
    
    showDenyButton: true,
    // showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Delete`,
    
    
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Saved!", "The Produit is not delete", "success");
    } else if (result.isDenied) {
      this.produitService.delete(id).subscribe(()=>{
        // console.log(res);
        location.reload();
      });
      Swal.fire("The Produit is delete");
      
    }
  });
  
}

  clearForm() {
    this.selectedProduit = null;
    this.profForm.reset();
    this.showText = false;
    this.showButton=false;
    location.reload();
    this.selectedFile = null;
  }
  

}





