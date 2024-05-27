import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureListComponent } from './facture-list.component';

describe('FactureListComponent', () => {
  let component: FactureListComponent;
  let fixture: ComponentFixture<FactureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
