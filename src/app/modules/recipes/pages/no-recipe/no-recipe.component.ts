import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-no-recipe',
  template: '<p class="text-center text-muted"> Please Select a recipe for more details...</p>'
})
export class NoRecipeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

}
