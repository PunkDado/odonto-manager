import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarAgendaComponent } from './mostrar-agenda/mostrar-agenda.component';
import { AgendaService } from './services/agenda.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgendaDiariaComponent } from './agenda-diaria/agenda-diaria.component';
import { ModalAgendaComponent } from './modal-agenda/modal-agenda.component';
import { InserirAgendaComponent } from './inserir-agenda/inserir-agenda.component';
import { EditarAgendaComponent } from './editar-agenda/editar-agenda.component';



@NgModule({
  declarations: [
    MostrarAgendaComponent,
    AgendaDiariaComponent,
    ModalAgendaComponent,
    InserirAgendaComponent,
    EditarAgendaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [
    AgendaService
  ]
})
export class AgendaModule { }
