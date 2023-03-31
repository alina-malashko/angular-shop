import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: IProduct;

  @Input() selectedRow: number;

  @Input() buttonDeleteState: boolean;

  @Input() buttonEditState: boolean;

  @Output() highlight = new EventEmitter<IProduct>();

  @Output() delete = new EventEmitter<number>();

  @Output() edit = new EventEmitter<IProduct>();

  highlightItem() {
    this.highlight.emit(this.product);
  }

  deleteItem(event: Event) {
    event.stopPropagation();
    let question = confirm('Delete row?');
    if (question) {
      this.delete.emit(this.product.code);
    }
  }

  editItem(event: Event) {
    event.stopPropagation();
    this.edit.emit(this.product);
  }
}
