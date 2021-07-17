import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public items: Observable<{ name: string }[]> = of([]);

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {

    this.items = this.afs.collection<{name: string}>('test').valueChanges()
  }

}
