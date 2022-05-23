import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarAgendaComponent } from './mostrar-agenda/mostrar-agenda.component';
import { AgendaService } from './services/agenda.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    MostrarAgendaComponent
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
