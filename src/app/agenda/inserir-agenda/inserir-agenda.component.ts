import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DentistaService } from 'src/app/dentista/services/dentista.service';
import { PacienteService } from 'src/app/paciente/services/paciente.service';
import { Agenda } from 'src/app/shared/models/agenda.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { Paciente } from 'src/app/shared/models/paciente.model';
import { AgendaService } from '../services/agenda.service';

@Component({
  selector: 'app-inserir-agenda',
  templateUrl: './inserir-agenda.component.html',
  styleUrls: ['./inserir-agenda.component.css']
})
export class InserirAgendaComponent implements OnInit {

  @ViewChild('formAgenda') formAgenda! : NgForm;
  agenda!: Agenda;
  dentistas!: Dentista[];
  pacientes!: Paciente[];
  date!: string;
  time!: string;

  constructor(
    private agendaService: AgendaService,
    private dentistaService: DentistaService,
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.agenda = new Agenda();
    this.listarDentistas();
    this.listarPacientes();
  }

  listarDentistas(): void {
    this.dentistaService.listarTodos().subscribe(
      (dados: Dentista[]) => {
        if(dados == null) {
          this.dentistas = [];
        }
        else {
          this.dentistas = dados;
        }
      }
    );

  }

  listarPacientes(): void {
    this.pacienteService.listarTodos().subscribe(
      (dados: Paciente[]) => {
        if(dados == null) {
          this.pacientes = [];
        }
        else {
          this.pacientes = dados;
        }
      }
    );
  }

  inserir(): void {
    if(this.formAgenda.form.valid) {
      let dataHora = this.date + " " + this.time + ":00";
      this.agenda.dataHora = dataHora;
      this.agenda.duracaoMinutos = 30;
      this.agendaService.inserir(this.agenda).subscribe(
        () => this.router.navigate(["agenda-diaria/2022-05-23"])
      );
    }
    
  }

}

function hoje(): string {
  let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}
