import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICard, IProduct } from '../interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card: ICard

  @Output() cancelCard = new EventEmitter<null>();

  @Output() addNewProduct = new EventEmitter<null>();

  @Output() changeBalance = new EventEmitter<number>();

  @Output() changePhoto = new EventEmitter<string>();

  @Output() changePrice = new EventEmitter<number>();

  @Output() changeName = new EventEmitter<string>();

  @Output() addProduct = new EventEmitter<IProduct>();

  @Output() editProduct = new EventEmitter<IProduct>();

  @Output() editButtonState = new EventEmitter<boolean>();

  nameError = 'Please, fill the field';

  priceError = 'Please, fill the field, number is expected';

  balanceError = 'Please, fill the field, number is expected';

  photoError = 'Please, fill the field, URL is expected';

  addForm: FormGroup = new FormGroup({
    'name': new FormControl('New Item', Validators.required),
    'price': new FormControl(100, Validators.required),
    'photo': new FormControl('https://example.com', Validators.required),
    'balance': new FormControl(100, Validators.required),
  })

  editForm: FormGroup

  ngOnInit() {
    this.editForm = new FormGroup({
      'name': new FormControl(this.card.product, Validators.required),
      'price': new FormControl(this.card.price, Validators.required),
      'photo': new FormControl(this.card.photo, Validators.required),
      'balance': new FormControl(this.card.balance, Validators.required),
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.editForm?.setValue({
      'name': changes['card'].currentValue.product,
      'price': changes['card'].currentValue.price,
      'photo': changes['card'].currentValue.photo,
      'balance': changes['card'].currentValue.balance
    })
  }

  cancel() {
    this.cancelCard.emit();
  }

  setEditButtonState() {
    if (this.editForm.value.name !== this.card.product) {
      this.editButtonState.emit(true);
    }
  }

  addNewItem() {
    this.addNewProduct.emit();
  }

  addItem() {
    const newProduct = {
      product: this.addForm.value.name,
      price: this.addForm.value.price,
      photo: this.addForm.value.photo,
      balance: this.addForm.value.balance,
      code: this.card.newId
    }
    this.addProduct.emit(newProduct);
  }

  editItem() {
    const editedProduct = {
      product: this.editForm.value.name,
      price: this.editForm.value.price,
      photo: this.editForm.value.photo,
      balance: this.editForm.value.balance,
      code: this.card.code
    }
    this.editProduct.emit(editedProduct);
  }
}
