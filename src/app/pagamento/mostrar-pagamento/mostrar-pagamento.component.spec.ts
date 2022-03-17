import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPagamentoComponent } from './mostrar-pagamento.component';

describe('MostrarPagamentoComponent', () => {
  let component: MostrarPagamentoComponent;
  let fixture: ComponentFixture<MostrarPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
