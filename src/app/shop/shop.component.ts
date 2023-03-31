import { Component, Input } from '@angular/core';
import { ICard, IProduct } from '../interface';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  @Input() shopName: string;

  @Input() columns: string[];

  @Input() products: IProduct[] = [];

  selectedRow: number = 0;

  buttonEditState: boolean = false;

  buttonDeleteState: boolean = false;

  card: ICard = {
    product: '',
    price: 0,
    photo: '',
    balance: 0,
    code: 0,
    state: 'default',
    newId: this.products.length * 10 + 100
  }

  delete(code: number) {
    this.products = this.products.filter(el => el.code !== code);
    this.card.state = 'default';
  }

  highlight(product: IProduct) {
    if (this.card.state !== 'add') {
      this.selectedRow = product.code;
      this.card = {
        ...product,
        state: 'item',
        newId: this.card.newId
      }
      this.buttonDeleteState = false;
    }
  }

  cancelCard() {
    this.card.state = 'default';
    this.buttonDeleteState = false;
    this.buttonEditState = false;
  }

  edit(product: IProduct) {
    this.selectedRow = product.code;
    this.card.state = 'edit';
    this.buttonDeleteState = true;
    this.card = {
      ...product,
      state: this.card.state,
      newId: this.card.newId
    }
  }

  addNewProduct() {
    this.card.state = 'add';
    this.selectedRow = 0;
    this.buttonDeleteState = true;
    this.buttonEditState = true;
  }

  editProduct(product: IProduct) {
    const products = [...this.products];
    for (let i = 0; i < products.length; i++) {
      if (products[i].code === product.code) {
        let newProduct = {
          ...products[i],
          product: product.product,
          price: product.price,
          photo: product.photo,
          balance: product.balance
        };
        products[i] = newProduct;
      }
    }
    this.products = products;
    this.card.state = 'default',
    this.buttonDeleteState = false;
    this.buttonEditState = false;
  }

  addProduct = (product: IProduct) => {
    const newItem = {
      product: product.product,
      price: product.price,
      photo: product.photo,
      balance: product.balance,
      code: product.code
    };
    const products = [...this.products];
    const nextCode = product.code + 10;
    products.push(newItem);
    this.products = products;
    this.card.state = 'default';
    this.buttonDeleteState = false,
    this.buttonEditState = false;
    this.card.newId = nextCode;
  }

  editButtonState(state: boolean) {
    this.buttonEditState = state;
  }
}