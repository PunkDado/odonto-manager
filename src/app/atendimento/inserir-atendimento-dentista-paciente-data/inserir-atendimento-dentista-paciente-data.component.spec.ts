import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirAtendimentoDentistaPacienteDataComponent } from './inserir-atendimento-dentista-paciente-data.component';

describe('InserirAtendimentoDentistaPacienteDataComponent', () => {
  let component: InserirAtendimentoDentistaPacienteDataComponent;
  let fixture: ComponentFixture<InserirAtendimentoDentistaPacienteDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirAtendimentoDentistaPacienteDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirAtendimentoDentistaPacienteDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
