import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../interfaces/stocks';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent {
  pages: number = 1;
  profForm!: FormGroup;
  stocks: Stock[] = [];
  showText: boolean = false;
  selectedStock:  Stock| null = null;
  showButton:boolean = false
  selectedFile: File | null = null;

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
    this.profForm = this.fb.group({
      produit_id: ['', Validators.required],
      quantite: ['', Validators.required],
    });
  }
  updateForm(stock: Stock) {
    this.selectedStock = stock;
    this.updateFormValues(stock);
  }

  updateFormValues(stock: Stock) {
    this.profForm.patchValue({
      id: stock.id,
      produit_id:stock.product_id,
      quantite: stock.quantite,
    });
    this.showText = true;
    let ref = document.getElementById('modify');
    ref?.click();
    this.showButton=true
  }

  submitForm() {
    const formData = new FormData();
    formData.append('product_id', this.profForm.get('product_id')?.value);
    formData.append('quantite', this.profForm.get('quantite')?.value);

    if (this.selectedStock) {
        this.updateStock(formData);
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
  updateStock(formData: FormData) {
    if (this.selectedStock) {
      this.stockService.updateStock(this.selectedStock.id, formData).subscribe(
        () => {
          Swal.fire({
            title: 'Success',
            text: "Le Produit a été modifié avec succès",
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
  this.selectedStock = null;
  this.profForm.reset();
  this.showText = false;
  this.showButton=false;
  location.reload();
  this.selectedFile = null;
}

}


