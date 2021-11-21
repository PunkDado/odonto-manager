import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtendimentoModule } from './atendimento/atendimento.module';
//import { ProcedimentoAplicadoModule } from './procedimento-aplicado/procedimento-aplicado.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AtendimentoModule,
    //ProcedimentoAplicadoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
