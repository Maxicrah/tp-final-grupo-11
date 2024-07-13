import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAlquilerComponent } from './form-alquiler.component';

describe('FormAlquilerComponent', () => {
  let component: FormAlquilerComponent;
  let fixture: ComponentFixture<FormAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAlquilerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
