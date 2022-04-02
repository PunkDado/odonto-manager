import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancarPagamentoComponent } from './lancar-pagamento.component';

describe('LancarPagamentoComponent', () => {
  let component: LancarPagamentoComponent;
  let fixture: ComponentFixture<LancarPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancarPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancarPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
