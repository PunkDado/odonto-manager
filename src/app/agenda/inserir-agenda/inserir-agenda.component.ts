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
  dentista!: Dentista;
  pacientes!: Paciente[];
  date!: string;
  time!: string;
  horario!: string;

  constructor(
    private agendaService: AgendaService,
    private dentistaService: DentistaService,
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.horario = this.route.snapshot.params['horario'];
    let dentistaId = +this.route.snapshot.params['dentistaId'];
    console.log(dentistaId);
    this.buscarDentista(dentistaId);
    console.log(this.dentista);
    this.agenda = new Agenda();
    this.agenda.dataHora = this.horario;
    this.agenda.dentista = this.dentista;
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

  buscarDentista(id: number): void {
    this.dentistaService.buscarPorId(id).subscribe(
      (dados: Dentista) => {
        //this.dentista = dados;
        this.agenda.dentista = dados;
        console.log(this.agenda.dentista);
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
      this.date = this.horario.substring(0, 10);
      
      this.agenda.duracaoMinutos = 30;
      this.agendaService.inserir(this.agenda).subscribe(
        () => this.router.navigate(["agenda-diaria/" + this.date])
      );
    }
  }

  voltar(): void {
    this.date = this.horario.substring(0, 10);
    this.router.navigate(["agenda-diaria/" + this.date]);
  }

}




function hoje(): string {
  let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}
