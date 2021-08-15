import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHeaderComponent } from './list-header.component';
import { SharedModule } from '../../../../shared/shared.module';

describe('ListHeaderComponent', () => {
  let component: ListHeaderComponent;
  let fixture: ComponentFixture<ListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListHeaderComponent],
      imports: [SharedModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
