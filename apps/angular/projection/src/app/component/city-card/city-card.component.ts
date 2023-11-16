import { Component, OnInit } from '@angular/core';
import { City } from '../../model/city.model';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';
import { CardComponent } from '../../ui/card/card.component';
import { List } from '../../model/list.model';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="citiesToLists(cities)"
    [imageSrc]="'assets/img/city.jpg'"
    (newItemEvent)="addOne()"
    (deleteItemEvent)="deleteOne($event)"
    customClass="bg-light-blue"></app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(private http: FakeHttpService, private store: CityStore) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  addOne() {
    this.store.addOne(randomCity());
  }

  deleteOne(id: number) {
    this.store.deleteOne(id);
  }

  citiesToLists(cities: City[]): List[] {
    const lists: List[] = [];
    cities.forEach((c) => {
      lists.push({
        id: c.id,
        name: c.name,
      });
    });
    return lists;
  }
}
