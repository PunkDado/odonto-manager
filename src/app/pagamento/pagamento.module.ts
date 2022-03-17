import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarPagamentoComponent } from './mostrar-pagamento/mostrar-pagamento.component';
import { AtendimentoService } from '../atendimento/services/atendimento.service';
import { DentistaService } from '../dentista/services/dentista.service';
import { RepasseService } from './services/repasse.service';



@NgModule({
  declarations: [
    MostrarPagamentoComponent
  ],
  imports: [
    CommonModule,
    
  ],
  providers: [
    AtendimentoService,
    DentistaService,
    RepasseService
  ]
})
export class PagamentoModule { }
