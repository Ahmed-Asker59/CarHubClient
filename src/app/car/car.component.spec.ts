import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiComponent } from './car.component';

describe('AudiComponent', () => {
  let component: AudiComponent;
  let fixture: ComponentFixture<AudiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
