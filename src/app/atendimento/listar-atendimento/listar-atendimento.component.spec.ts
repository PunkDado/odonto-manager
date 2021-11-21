import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAtendimentoComponent } from './listar-atendimento.component';

describe('ListarAtendimentoComponent', () => {
  let component: ListarAtendimentoComponent;
  let fixture: ComponentFixture<ListarAtendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAtendimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
