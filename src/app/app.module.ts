import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtendimentoModule } from './atendimento/atendimento.module';
import { DentistaModule } from './dentista/dentista.module';
//import { AngularFontAwesomeModule } from 'angular-font-awesome';
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
    //AngularFontAwesomeModule,
    //ProcedimentoAplicadoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
