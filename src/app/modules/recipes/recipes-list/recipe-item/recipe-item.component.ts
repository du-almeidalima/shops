import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Recipe} from '../../../../shared/models/recipe.model';
// @ts-ignore
import FOOD_PLACEHOLDER from '../../../../../assets/img/food-placeholder.jpg';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

  constructor(private renderer: Renderer2) {
  }

  @Input()
  public recipe: Recipe;

  @ViewChild('recipeImg', {static: true})
  public recipeImg: ElementRef;

  ngOnInit() {
  }

  public imgError(): void {
    this.renderer.setAttribute(this.recipeImg.nativeElement, 'src', FOOD_PLACEHOLDER)
  }

}
