import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalDetailDtoComponent } from './rental-detail-dto.component';

describe('RentalDetailDtoComponent', () => {
  let component: RentalDetailDtoComponent;
  let fixture: ComponentFixture<RentalDetailDtoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalDetailDtoComponent]
    });
    fixture = TestBed.createComponent(RentalDetailDtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
