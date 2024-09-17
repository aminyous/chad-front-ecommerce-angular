import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItem: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  addToCart(theCartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem!: CartItem;

    if (this.cartItem.length > 0) {
      // for (let tempCartItem of this.cartItem) {
      //   if (tempCartItem.id === theCartItem.id) {
      //     existingCartItem = tempCartItem;
      //     break;
      //   }
      // }
      existingCartItem = this.cartItem.find(
        (tempCartItem) => tempCartItem.id === theCartItem.id
      )!;
      alreadyExistsInCart = existingCartItem != undefined;
    }
    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItem.push(theCartItem);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let currentCartItem of this.cartItem) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityvalue: number) {
    console.log('Content of the cart : ');
    for (let tempCartItem of this.cartItem) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(
        `name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity} unitPrice: ${tempCartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`
      );
      console.log(
        `totalPrice: ${totalPriceValue.toFixed(
          2
        )}, totalQuantity: ${totalQuantityvalue}`
      );
      console.log('---');
    }
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItem.findIndex(
      (tempCartItem) => tempCartItem.id === theCartItem.id
    );
    
    if (itemIndex > -1) {
      this.cartItem.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}
