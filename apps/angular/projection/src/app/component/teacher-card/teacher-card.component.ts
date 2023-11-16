import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { List } from '../../model/list.model';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachersToLists(teachers)"
    [imageSrc]="'assets/img/teacher.png'"
    (newItemEvent)="addOne()"
    (deleteItemEvent)="deleteOne($event)"
    customClass="bg-light-red"></app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  addOne() {
    this.store.addOne(randTeacher());
  }

  deleteOne(id: number) {
    this.store.deleteOne(id);
  }

  teachersToLists(teachers: Teacher[]): List[] {
    const lists: List[] = [];
    teachers.forEach((t) => {
      lists.push({
        id: t.id,
        name: t.firstname,
      });
    });
    return lists;
  }
}
