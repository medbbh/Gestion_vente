import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produit } from '../interfaces/produit';
import { Panier, createPanierItem } from '../interfaces/panier';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private cartItems = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItems.asObservable();

  private items: Panier[] = [];  

  constructor(private http: HttpClient) {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart) as Panier[];
      this.cartItems.next(this.items.length);
    }
  }

  addToCart(product: Produit) {
    const productExists = this.items.find(item => item.id === product.id);
    if (!productExists) {
      const panierItem = createPanierItem(product);
      this.items.push(panierItem);
      localStorage.setItem('cart', JSON.stringify(this.items));
      this.cartItems.next(this.items.length); // Update the observable value
    }
  }

  getCartItems(): Panier[] {
    return this.items;
  }


  clearCart() {
    this.items = [];
    localStorage.removeItem('cart');
    this.cartItems.next(this.items.length); // Update the observable value
  }
  removeFromCart(productId: number): void {
    let cart = this.getCartItems();
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.reload()
    }
  }
}
