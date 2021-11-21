import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarAtendimentoComponent } from './atendimento/editar-atendimento/editar-atendimento.component';
import { InserirAtendimentoComponent } from './atendimento/inserir-atendimento/inserir-atendimento.component';
import { ListarAtendimentoComponent } from './atendimento/listar-atendimento/listar-atendimento.component';
//import { EditarProcedimentoAplicadoComponent } from './procedimento-aplicado/editar-procedimento-aplicado/editar-procedimento-aplicado.component';
//import { InserirProcedimentoAplicadoPorAtendimentoComponent } from './procedimento-aplicado/inserir-procedimento-aplicado-por-atendimento/inserir-procedimento-aplicado-por-atendimento.component';
//import { InserirProcedimentoAplicadoComponent } from './procedimento-aplicado/inserir-procedimento-aplicado/inserir-procedimento-aplicado.component';
//import { ListarProcedimentoAplicadoComponent } from './procedimento-aplicado/listar-procedimento-aplicado/listar-procedimento-aplicado.component';

const routes: Routes = [
  { path: '', redirectTo: 'atendimentos/listar', pathMatch: 'full'},
  { path: 'atendimentos', redirectTo: 'atendimentos/listar'},
  { path: 'atendimentos/listar', component: ListarAtendimentoComponent},
  { path: 'atendimentos/novo', component: InserirAtendimentoComponent},
  { path: 'atendimentos/editar/:id', component: EditarAtendimentoComponent},
  //{ path: 'procedimentos-aplicados', redirectTo: 'procedimentos-aplicados/listar'},
  //{ path: 'procedimentos-aplicados/listar', component: ListarProcedimentoAplicadoComponent},
  //{ path: 'procedimentos-aplicados/novo', component: InserirProcedimentoAplicadoComponent},
  //{ path: 'procedimentos-aplicados/novo/:id', component: InserirProcedimentoAplicadoPorAtendimentoComponent},
  //{ path: 'procedimentos-aplicados/editar/:id', component: EditarProcedimentoAplicadoComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
