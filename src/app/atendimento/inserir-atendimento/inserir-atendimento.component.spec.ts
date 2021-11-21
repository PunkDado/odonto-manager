import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirAtendimentoComponent } from './inserir-atendimento.component';

describe('InserirAtendimentoComponent', () => {
  let component: InserirAtendimentoComponent;
  let fixture: ComponentFixture<InserirAtendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirAtendimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
