import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoEstadisticasComponent } from './pago-estadisticas.component';

describe('PagoEstadisticasComponent', () => {
  let component: PagoEstadisticasComponent;
  let fixture: ComponentFixture<PagoEstadisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoEstadisticasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
