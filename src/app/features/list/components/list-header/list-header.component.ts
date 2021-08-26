import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public inputHandler = (e: any) => {
    console.log(e.target.textContent);
  }

  public inviteHandler = () => {
    console.log('CLICKED');
  }
}
