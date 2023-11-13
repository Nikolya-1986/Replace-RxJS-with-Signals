import { Component, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PRODUCTS } from '../../constants/constant';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  public products = PRODUCTS;
  public productList = signal(PRODUCTS);
  public currentProduct = signal(`user_${Math.floor(Math.random() * 100) + 1}`);
  public productName!: string;
  public productPrice!: number;

  constructor() {
    effect(() => {
      console.log(this.totalPrice());
      console.log(this.productList());
    })
  }

  public totalPrice = computed(() => {
    return this.productList().reduce((acc, product) => acc + product.price, 0);
  });

  public removeItem(item: { name: string; price: number }): void {
    this.productList.set(this.productList().filter((product) => product !== item))
  };

  public addProduct(): void {
    this.productList.set([...this.productList(), { name: this.productName, price: this.productPrice, lastEditedBy: this.currentProduct() }]);
    this.productName = '';
    this.productPrice = 0;
  }
}
