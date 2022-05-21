import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarAgendaComponent } from './mostrar-agenda/mostrar-agenda.component';
import { AgendaService } from './services/agenda.service';



@NgModule({
  declarations: [
    MostrarAgendaComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AgendaService
  ]
})
export class AgendaModule { }
