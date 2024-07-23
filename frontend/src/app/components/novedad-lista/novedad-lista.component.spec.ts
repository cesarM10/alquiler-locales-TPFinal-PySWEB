import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadListaComponent } from './novedad-lista.component';

describe('NovedadListaComponent', () => {
  let component: NovedadListaComponent;
  let fixture: ComponentFixture<NovedadListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovedadListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovedadListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
