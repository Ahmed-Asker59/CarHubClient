import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentOrderComponent } from './rent-order.component';

describe('RentOrderComponent', () => {
  let component: RentOrderComponent;
  let fixture: ComponentFixture<RentOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
