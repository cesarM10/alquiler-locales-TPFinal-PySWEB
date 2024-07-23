import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalFormsComponent } from './local-forms.component';

describe('LocalFormsComponent', () => {
  let component: LocalFormsComponent;
  let fixture: ComponentFixture<LocalFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
