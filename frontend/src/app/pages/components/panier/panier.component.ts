import { Component } from '@angular/core';
import { Produit } from '../../interfaces/produit';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {

  carts:Produit[] = []
  prixTotal:number = 0;

  constructor() { }
  ngOnInit(): void {
    const storedObject = localStorage.getItem('cart');

    if (storedObject) {
      // Parse the JSON string into a JavaScript object
      const myObject = JSON.parse(storedObject);

      // Convert the object to an array
      if (storedObject) {
        // Parse the JSON string into a JavaScript object
        this.carts = JSON.parse(storedObject) as Produit[];
      }}

      this.carts.forEach(item => {
        this.prixTotal += Number(item.prix);
      });
  }
  }
