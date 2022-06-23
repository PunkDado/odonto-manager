import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaDiariaDentistaMobileComponent } from './agenda/agenda-diaria-dentista-mobile/agenda-diaria-dentista-mobile.component';
import { AgendaDiariaDentistaComponent } from './agenda/agenda-diaria-dentista/agenda-diaria-dentista.component';
import { AgendaDiariaComponent } from './agenda/agenda-diaria/agenda-diaria.component';
import { EditarAgendaComponent } from './agenda/editar-agenda/editar-agenda.component';
import { InserirAgendaComponent } from './agenda/inserir-agenda/inserir-agenda.component';
import { MostrarAgendaComponent } from './agenda/mostrar-agenda/mostrar-agenda.component';
import { EditarAtendimentoComponent } from './atendimento/editar-atendimento/editar-atendimento.component';
import { InserirAtendimentoDentistaPacienteDataComponent } from './atendimento/inserir-atendimento-dentista-paciente-data/inserir-atendimento-dentista-paciente-data.component';
import { InserirAtendimentoComponent } from './atendimento/inserir-atendimento/inserir-atendimento.component';
import { ListarAtendimentoComponent } from './atendimento/listar-atendimento/listar-atendimento.component';
import { LoginRoutes } from './auth/auth-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { EditarUsuarioComponent } from './auth/editar-usuario/editar-usuario.component';
import { InserirUsuarioComponent } from './auth/inserir-usuario/inserir-usuario.component';
import { ListarUsuarioComponent } from './auth/listar-usuario/listar-usuario.component';
import { LoginComponent } from './auth/login/login.component';
import { EditarDentistaComponent } from './dentista/editar-dentista/editar-dentista.component';
import { InserirDentistaComponent } from './dentista/inserir-dentista/inserir-dentista.component';
import { ListarDentistaComponent } from './dentista/listar-dentista/listar-dentista.component';
import { HomeComponent } from './home/home.component';
import { EditarPacienteComponent } from './paciente/editar-paciente/editar-paciente.component';
import { InserirPacienteComponent } from './paciente/inserir-paciente/inserir-paciente.component';
import { ListarPacienteComponent } from './paciente/listar-paciente/listar-paciente.component';
import { LancarPagamentoComponent } from './pagamento/lancar-pagamento/lancar-pagamento.component';
import { MostrarPagamentoComponent } from './pagamento/mostrar-pagamento/mostrar-pagamento.component';
//import { EditarProcedimentoAplicadoComponent } from './procedimento-aplicado/editar-procedimento-aplicado/editar-procedimento-aplicado.component';
//import { InserirProcedimentoAplicadoPorAtendimentoComponent } from './procedimento-aplicado/inserir-procedimento-aplicado-por-atendimento/inserir-procedimento-aplicado-por-atendimento.component';
//import { InserirProcedimentoAplicadoComponent } from './procedimento-aplicado/inserir-procedimento-aplicado/inserir-procedimento-aplicado.component';
//import { ListarProcedimentoAplicadoComponent } from './procedimento-aplicado/listar-procedimento-aplicado/listar-procedimento-aplicado.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent},

  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'atendimentos', redirectTo: 'atendimentos/listar'},
  { path: 'atendimentos/listar', component: ListarAtendimentoComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ADMIN, GERENTE, DENTISTA'}
  },
  { path: 'atendimentos/novo', component: InserirAtendimentoComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ADMIN, GERENTE, DENTISTA'}
  },
  { path: 'atendimentos/novo/:dentistaId/:pacienteId/:dia', component: InserirAtendimentoDentistaPacienteDataComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ADMIN, GERENTE, DENTISTA'}
  },
  { path: 'atendimentos/editar/:id', component: EditarAtendimentoComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ADMIN, GERENTE, DENTISTA'}
  },

  { path: 'dentistas', redirectTo: 'dentistas/listar'},
  { path: 'dentistas/listar', component: ListarDentistaComponent},
  { path: 'dentistas/novo', component: InserirDentistaComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ADMIN, GERENTE'}
  },
  { path: 'dentistas/editar/:id', component: EditarDentistaComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ADMIN, GERENTE'}
  },

  { 
    path: 'pagamentos', 
    component: MostrarPagamentoComponent, 
    canActivate: [AuthGuard], 
    data: { role: 'ADMIN, GERENTE'}
  },
  { path: 'pagamentos/lancar', component: LancarPagamentoComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ADMIN, GERENTE'}},

  { path: 'pacientes', redirectTo: 'pacientes/listar'},
  { path: 'pacientes/listar', component: ListarPacienteComponent},
  { path: 'pacientes/novo', component: InserirPacienteComponent},
  { path: 'pacientes/editar/:id', component: EditarPacienteComponent},

  { path: 'agenda', component: MostrarAgendaComponent },
  { path: 'agenda-diaria/:dia', component: AgendaDiariaComponent },
  { path: 'agenda/novo/:horario/:dentistaId', component: InserirAgendaComponent },
  { path: 'agenda/editar/:id', component: EditarAgendaComponent },
  { path: 'agenda/:dia/:dentistaId', component: AgendaDiariaDentistaComponent },
  { path: 'agenda-mobile/:dia/:dentistaId', component: AgendaDiariaDentistaMobileComponent },

  { path: 'usuarios', redirectTo: 'usuarios/listar' },
  { path: 'usuarios/listar', component: ListarUsuarioComponent },
  { path: 'usuarios/novo', component: InserirUsuarioComponent },
  { path: 'usuarios/editar/:id', component: EditarUsuarioComponent },

  //{ path: 'login', component: LoginComponent },
  ...LoginRoutes
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
