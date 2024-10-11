import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurbrandsComponent } from './ourbrands.component';

describe('OurbrandsComponent', () => {
  let component: OurbrandsComponent;
  let fixture: ComponentFixture<OurbrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurbrandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurbrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
