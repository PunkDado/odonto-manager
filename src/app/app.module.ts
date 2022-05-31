import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtendimentoModule } from './atendimento/atendimento.module';
import { DentistaModule } from './dentista/dentista.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PagamentoModule } from './pagamento/pagamento.module';
import { PacienteModule } from './paciente/paciente.module';
import { ProcedimentoModule } from './procedimento/procedimento.module';
import { TipoProcedimentoModule } from './tipo-procedimento/tipo-procedimento.module';
import { AgendaModule } from './agenda/agenda.module';

//import { AngularFontAwesomeModule } from 'angular-font-awesome';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AtendimentoModule,
    DentistaModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    PagamentoModule,
    PacienteModule,
    ProcedimentoModule,
    TipoProcedimentoModule,
    AgendaModule
  ],
  providers: [
    //{ provide: LOCALE_ID, useValue: 'pt-PT' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
