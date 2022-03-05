import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtendimentoModule } from './atendimento/atendimento.module';
import { DentistaModule } from './dentista/dentista.module';
//import { ProcedimentoAplicadoModule } from './procedimento-aplicado/procedimento-aplicado.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AtendimentoModule,
    DentistaModule,
    HttpClientModule,
    //ProcedimentoAplicadoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
