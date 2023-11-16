import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { List } from '../../model/list.model';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="studentsToLists(students)"
    [imageSrc]="'assets/img/student.webp'"
    (newItemEvent)="addOne()"
    (deleteItemEvent)="deleteOne($event)"
    customClass="bg-light-green"></app-card>`,
  standalone: true,
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  addOne() {
    this.store.addOne(randStudent());
  }

  deleteOne(id: number) {
    this.store.deleteOne(id);
  }

  studentsToLists(students: Student[]): List[] {
    const lists: List[] = [];
    students.forEach((s) => {
      lists.push({
        id: s.id,
        name: s.firstname,
      });
    });
    return lists;
  }
}
