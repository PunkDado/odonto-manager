import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DentistaService } from 'src/app/dentista/services/dentista.service';
import { PacienteService } from 'src/app/paciente/services/paciente.service';
import { Agenda } from 'src/app/shared/models/agenda.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { Paciente } from 'src/app/shared/models/paciente.model';
import { AgendaService } from '../services/agenda.service';

@Component({
  selector: 'app-editar-agenda',
  templateUrl: './editar-agenda.component.html',
  styleUrls: ['./editar-agenda.component.css']
})
export class EditarAgendaComponent implements OnInit {

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
    let id = +this.route.snapshot.params['id'];
    this.buscarAgendamento(id);
    this.listarDentistas();
    this.listarPacientes();
  }

  buscarAgendamento(id: number): void {
    this.agendaService.buscarPorId(id).subscribe(
      (dados: Agenda) => {
        this.agenda = dados;
      }
    );
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

  atualizar(): void {
    let date = this.agenda.dataHora?.substring(0,10);
    if (this.formAgenda.form.valid) {
      this.agendaService.alterar(this.agenda).subscribe(
        () => this.router.navigate(['/agenda-diaria/' + date])
      );
    }
  }

  voltar(): void {
    this.date = this.agenda.dataHora!.substring(0, 10);
    this.router.navigate(["agenda-diaria/" + this.date]);
  }

}
