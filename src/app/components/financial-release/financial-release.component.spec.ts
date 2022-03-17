import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialReleaseComponent } from './financial-release.component';

describe('FinancialReleaseComponent', () => {
  let component: FinancialReleaseComponent;
  let fixture: ComponentFixture<FinancialReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialReleaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
