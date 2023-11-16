import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() customClass = '';
  @Input() imageSrc!: string;
  @Output() newItemEvent = new EventEmitter();
  @Output() deleteItemEvent = new EventEmitter<number>();

  constructor() {}

  addNewItem() {
    this.newItemEvent.emit();
  }

  deleteOne(id: number) {
    this.deleteItemEvent.emit(id);
  }
}
