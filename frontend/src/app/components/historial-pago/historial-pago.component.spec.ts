import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPagoComponent } from './historial-pago.component';

describe('HistorialPagoComponent', () => {
  let component: HistorialPagoComponent;
  let fixture: ComponentFixture<HistorialPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialPagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
