import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  shopName = 'IShop';
  columns = ['Product', 'Price', 'Photo', 'Stock balance', 'Control'];
  products = [
    {product: "Black iPhone Speaker", price: 249.99, photo: "https://i.postimg.cc/pL6tssMj/speaker.png", balance: 55, code: 100},
    {product: "Black Headphone", price: 249.99, photo: "https://i.postimg.cc/NfGqY3gT/headphone.png", balance: 34, code: 110}, 
    {product: "Mackbook Pro", price: 2049.99, photo: "https://i.postimg.cc/DzRnwBCh/mac.png", balance: 42, code: 120}
  ];
}