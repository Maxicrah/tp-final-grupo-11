import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlquilerPropietarioComponent } from './list-alquiler-propietario.component';

describe('ListAlquilerPropietarioComponent', () => {
  let component: ListAlquilerPropietarioComponent;
  let fixture: ComponentFixture<ListAlquilerPropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAlquilerPropietarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAlquilerPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
