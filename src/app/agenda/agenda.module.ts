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
import { AgendaDiariaDentistaComponent } from './agenda-diaria-dentista/agenda-diaria-dentista.component';
import { AgendaDiariaDentistaMobileComponent } from './agenda-diaria-dentista-mobile/agenda-diaria-dentista-mobile.component';



@NgModule({
  declarations: [
    MostrarAgendaComponent,
    AgendaDiariaComponent,
    ModalAgendaComponent,
    InserirAgendaComponent,
    EditarAgendaComponent,
    AgendaDiariaDentistaComponent,
    AgendaDiariaDentistaMobileComponent
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
