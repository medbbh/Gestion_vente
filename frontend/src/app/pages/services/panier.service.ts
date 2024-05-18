import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private cartItems = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItems.asObservable();

  private items: any[] = [];  

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
      this.cartItems.next(this.items.length);
    }
  }

  addToCart(product: any) {
    const productExists = this.items.find(item => item.id === product.id);
    if (!productExists) {
      this.items.push(product);
      localStorage.setItem('cart', JSON.stringify(this.items));
      this.cartItems.next(this.items.length); // Update the observable value
    }
  }

  getCartItems() {
    return this.items;
  }

}
