import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaDiariaDentistaComponent } from './agenda-diaria-dentista.component';

describe('AgendaDiariaDentistaComponent', () => {
  let component: AgendaDiariaDentistaComponent;
  let fixture: ComponentFixture<AgendaDiariaDentistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaDiariaDentistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaDiariaDentistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
