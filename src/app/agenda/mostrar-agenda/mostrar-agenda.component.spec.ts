import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarAgendaComponent } from './mostrar-agenda.component';

describe('MostrarAgendaComponent', () => {
  let component: MostrarAgendaComponent;
  let fixture: ComponentFixture<MostrarAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
