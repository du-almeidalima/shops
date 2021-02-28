import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListCardComponent } from './shopping-list-card.component';

describe('ShoppingListCardComponent', () => {
  let component: ShoppingListCardComponent;
  let fixture: ComponentFixture<ShoppingListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
