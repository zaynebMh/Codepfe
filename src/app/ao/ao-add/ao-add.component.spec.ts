import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoAddComponent } from './ao-add.component';

describe('AoAddComponent', () => {
  let component: AoAddComponent;
  let fixture: ComponentFixture<AoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AoAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
