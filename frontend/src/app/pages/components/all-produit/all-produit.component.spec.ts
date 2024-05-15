import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProduitComponent } from './all-produit.component';

describe('AllProduitComponent', () => {
  let component: AllProduitComponent;
  let fixture: ComponentFixture<AllProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
