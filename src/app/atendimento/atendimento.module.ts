import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentoService } from './services/atendimento.service';
import { ListarAtendimentoComponent } from './listar-atendimento/listar-atendimento.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InserirAtendimentoComponent } from './inserir-atendimento/inserir-atendimento.component';
import { EditarAtendimentoComponent } from './editar-atendimento/editar-atendimento.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalAtendimentoComponent } from './modal-atendimento/modal-atendimento.component';
import { InserirAtendimentoDentistaPacienteDataComponent } from './inserir-atendimento-dentista-paciente-data/inserir-atendimento-dentista-paciente-data.component';


@NgModule({
  declarations: [
    ListarAtendimentoComponent,
    InserirAtendimentoComponent,
    EditarAtendimentoComponent,
    ModalAtendimentoComponent,
    InserirAtendimentoDentistaPacienteDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [
    AtendimentoService
  ]
})
export class AtendimentoModule { }
