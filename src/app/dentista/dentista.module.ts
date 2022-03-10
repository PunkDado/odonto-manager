import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DentistaService } from './services/dentista.service';
import { ListarDentistaComponent } from './listar-dentista/listar-dentista.component';
import { InserirDentistaComponent } from './inserir-dentista/inserir-dentista.component';
import { EditarDentistaComponent } from './editar-dentista/editar-dentista.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListarDentistaComponent,
    InserirDentistaComponent,
    EditarDentistaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    DentistaService,
  ]
})
export class DentistaModule { }
