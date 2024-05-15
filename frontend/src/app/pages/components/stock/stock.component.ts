import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../interfaces/stocks';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  faTrash= faTrash;
  faEdit= faEdit;

  pages: number = 1;
  stockForm!: FormGroup;
  stocks: Stock[] = [];
  showText: boolean = false;
  selectedStock:  Stock| null = null;
  showButton:boolean = false
  selectedFile: File | null = null;
  isEditing: Stock | null = null;

  constructor(private fb: FormBuilder, private stockService: StockService,private router:Router,private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
    this.fetchStocks();
    this.initializeForm();
  }

  fetchStocks() {
    this.stockService.listStock().subscribe((response: HttpResponse<Stock[]>) => {
      const data: Stock[] = response.body || []; // Extraction du corps de la réponse HTTP
      this.stocks = data; // Assurez-vous que les données sont correctement assignées
    });
  }

  initializeForm() {
    this.stockForm = this.fb.group({
      product_id: ['', Validators.required],
      quantite: ['', Validators.required],
      name :['',Validators.required],
    });
  }
  updateForm(stock: Stock) {
    this.selectedStock = stock;
    this.updateFormValues(stock);
  }

  updateFormValues(stock: Stock) {
    this.stockForm.patchValue({
      id: stock.id,
      product_id:stock.product_id,
      quantite: stock.quantite,
      
    });
    this.showText = true;
    let ref = document.getElementById('modify');
    ref?.click();
    this.showButton=true
  }

  submitForm() {
    const formData = new FormData();
    formData.append('product_id', this.stockForm.get('product_id')?.value);
    formData.append('quantite', this.stockForm.get('quantite')?.value);

    if (this.isEditing ) {
      this.updateStock(this.isEditing.id, formData);
  } else {
      this.addStock(formData);
  }

  }
addStock(formData: FormData) {
  this.stockService.addStock(formData).subscribe(
      () => {
        Swal.fire({
          title: 'Success',
          text: "Le Produit a été ajouté dans le stock avec succès",
          icon: 'success',
        });
        this.fetchStocks();
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
 
updateStock(id: number, formData: FormData): void {
  this.stockService.updateStock(id, formData).subscribe({
    next: (response) => {

      // Actualiser les données affichées
      this.fetchStocks(); // Appel pour rafraîchir la liste complète des produits

      Swal.fire('Success', 'Le Stock a été modifié avec succès', 'success');

      // Réinitialiser le formulaire
      this.clearForm();
    },
    error: (err) => {
      console.error('Failed to update stock', err);
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  });
}
delete(id: Stock){
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
    this.stockService.delete(id).subscribe(()=>{
      // console.log(res);
      location.reload();
    });
    Swal.fire("The Produit is delete");
    
  }
});

}

clearForm() {
  this.isEditing = null;
  this.selectedStock = null;
  this.stockForm.reset();
  this.showText = false;
  this.showButton=false;
  location.reload();
  this.selectedFile = null;
  
}

}


