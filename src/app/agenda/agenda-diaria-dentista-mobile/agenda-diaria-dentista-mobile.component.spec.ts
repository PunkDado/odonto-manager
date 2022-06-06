import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaDiariaDentistaMobileComponent } from './agenda-diaria-dentista-mobile.component';

describe('AgendaDiariaDentistaMobileComponent', () => {
  let component: AgendaDiariaDentistaMobileComponent;
  let fixture: ComponentFixture<AgendaDiariaDentistaMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaDiariaDentistaMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaDiariaDentistaMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
