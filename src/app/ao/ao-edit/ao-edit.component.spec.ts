import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoEditComponent } from './ao-edit.component';

describe('AoEditComponent', () => {
  let component: AoEditComponent;
  let fixture: ComponentFixture<AoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AoEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
