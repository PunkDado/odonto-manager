import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarPagamentoComponent } from './mostrar-pagamento/mostrar-pagamento.component';
import { AtendimentoService } from '../atendimento/services/atendimento.service';
import { DentistaService } from '../dentista/services/dentista.service';
import { RepasseService } from './services/repasse.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';




@NgModule({
  declarations: [
    MostrarPagamentoComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule
    
  ],
  providers: [
    AtendimentoService,
    DentistaService,
    RepasseService
  ]
})
export class PagamentoModule { }
