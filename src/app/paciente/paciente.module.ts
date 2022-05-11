import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteService } from './services/paciente.service';
import { ListarPacienteComponent } from './listar-paciente/listar-paciente.component';
import { InserirPacienteComponent } from './inserir-paciente/inserir-paciente.component';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';
import { ModalPacienteComponent } from './modal-paciente/modal-paciente.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    ListarPacienteComponent,
    InserirPacienteComponent,
    EditarPacienteComponent,
    ModalPacienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [
    PacienteService
  ]
})
export class PacienteModule { }
