import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveOrderComponent } from './reserve-order.component';

describe('ReserveOrderComponent', () => {
  let component: ReserveOrderComponent;
  let fixture: ComponentFixture<ReserveOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserveOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
