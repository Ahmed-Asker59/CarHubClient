import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercedesComponent } from './mercedes.component';

describe('MercedesComponent', () => {
  let component: MercedesComponent;
  let fixture: ComponentFixture<MercedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercedesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MercedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
