import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DentistaService } from 'src/app/dentista/services/dentista.service';
import { ModalPacienteComponent } from 'src/app/paciente/modal-paciente/modal-paciente.component';
import { Agenda } from 'src/app/shared/models/agenda.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { Paciente } from 'src/app/shared/models/paciente.model';
import { ModalAgendaComponent } from '../modal-agenda/modal-agenda.component';
import { AgendaService } from '../services/agenda.service';

@Component({
  selector: 'app-agenda-diaria',
  templateUrl: './agenda-diaria.component.html',
  styleUrls: ['./agenda-diaria.component.css']
})
export class AgendaDiariaComponent implements OnInit {

  @ViewChild('formAgenda') formAgenda!: NgForm;

  dia!: string; // formato: yyyy-MM-dd
  agendamentos!: Agenda[];
  dentistas!: Dentista[];
  dentistaId!: number | undefined;
  mes!: string;
  horarios: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agendaService: AgendaService,
    private dentistaService: DentistaService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    let dia = this.route.snapshot.params['dia'];
    this.dia = dia;
    this.listarTodos();
    this.listarDentistas();
    this.listarHorarios();
  }

  listarTodos(): void {
    this.agendaService.listarTodos().subscribe((dados) => {
      if (dados == null) {
        this.agendamentos = [];
      }
      else {
        this.agendamentos = dados;
      }
    });
  }

  listarDentistas(): void {
    this.dentistaService.listarTodos().subscribe((dados) => {
      if (dados == null) {
        this.dentistas = [];
      }
      else {
        this.dentistas = dados;
      }
    });
  }

  remover($event: any, agenda: Agenda): void {
    $event.preventDefault();
    if (confirm('Deseja realmente remover a agenda "' + agenda.dataHora + '"?')) {
      this.agendaService.remover(agenda.id!).subscribe(
        () => this.listarTodos()
      );
    }
  }

  abrirModalAgenda(agenda: Agenda) {
    const modalRef = this.modalService.open(ModalAgendaComponent);
    modalRef.componentInstance.agenda = agenda;
  }

  abrirModalPaciente(paciente: Paciente) {
    const modalRef = this.modalService.open(ModalPacienteComponent);
    modalRef.componentInstance.paciente = paciente;
  }

  selecionarAgendaDiariaDentista(): void {
    this.router.navigate(['agenda/' + this.dia + '/' + this.dentistaId]);
  }

  clicarAgendaDiariaDentista(dentista: Dentista): void {
    this.router.navigate(['agenda/' + this.dia + '/' + dentista.id]);
  }

  setHoje(): void {
    let diaDeHoje: string = hoje().substring(0,10);
    this.dia = diaDeHoje;
    this.router.navigate(['/agenda-diaria/' + diaDeHoje]);
    this.listarTodos();
    this.listarDentistas();
    this.listarHorarios();
  }

  setNovoDia(): void {
    this.router.navigate(['/agenda-diaria/' + this.dia]);
    this.listarTodos();
    this.listarDentistas();
    this.listarHorarios();
  }

  listarHorarios(): void {
    let horaInicial: number = 8;
    let minutoInicial: number = 30;
    let horaFinal: number = 18;
    let minutoFinal: number = 30;
    let hora: number = horaInicial;
    this.horarios = [];
    while (hora <= horaFinal) {
      this.horarios.push(this.dia + ' ' + String(hora).padStart(2, '0') + ':00:00');
      this.horarios.push(this.dia + ' ' + String(hora).padStart(2, '0') + ':30:00');
      hora++
    }
  }

  listarAgendamentosPorHorario(horario: string): Agenda[] {
    return this.agendamentos.filter(
      agendamento => agendamento.dataHora == horario
    );
  }

  listarAgendamentosPorHorarioPorDentista(horario: string, dentistaId: number): Agenda[] {
    return this.listarAgendamentosPorHorario(horario).filter(
      agendamento => agendamento.dentista!.id == dentistaId
    )
  }

  arrowLeft(): void {
    let date = strToDate(this.dia);
    console.log(date);
    let day = date.getDate();
    let month = date.getMonth();
    let yyyy = date.getFullYear();

    if (day == 1) {
      if (month == 0) {
        yyyy--;
        month = 11;
        day = 31;
      }
      else {
        if ([4, 6, 8, 11].includes(month)) {
          month--;
          day = 30;
        } 
        else if (month == 2) {
          if (yyyy % 4 == 0) {
            month--;
            day = 29;
          }
          else {
            month--;
            day = 28;
          }
        }
        else {
          month--;
          day = 31;
        }
      }
    }
    else {
      day--;
    }
    
    let dd = String(day).padStart(2, '0');
    let mm = String(month + 1).padStart(2, '0');
    this.dia = yyyy + '-' + mm + '-' + dd;
    this.setNovoDia();
  }

  arrowRight(): void {
    let date = strToDate(this.dia);
    console.log(date);
    let day = date.getDate();
    let month = date.getMonth();
    let yyyy = date.getFullYear();

    if (month == 1) {
      if (yyyy % 4 == 0) {
        if (day == 28) {
          day++;
        } 
        else if (day == 29) {
          month++;
          day = 1;
        }
        else {
          day++;
        }
      }
      else if (day == 28) {
        month++;
        day = 1;
      }
      else {
        day++;
      }
    }
    else if (day == 31) {
      if (month == 11) {
        yyyy++;
        month = 0;
        day = 1;
      }
      else {
        month++;
        day = 1;
      }
    }
    else if (day == 30 && [3, 5, 8, 10].includes(month)) {
      month++;
      day = 1;
    }
    else {
      day++;
    }

    let dd = String(day).padStart(2, '0');
    let mm = String(month + 1).padStart(2, '0');
    this.dia = yyyy + '-' + mm + '-' + dd;
    this.setNovoDia();
  }

}

function hoje(): string {
  let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd + " 00:00:00";
}

function mesAtual(): string {
  let today = new Date();
    var dd = "01";
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd + " 00:00:00";
}

function strToDate(strDate: string): Date {
    let year = parseInt(strDate.substring(0,4));
    let month = parseInt(strDate.substring(5,7)) - 1;
    let day = parseInt(strDate.substring(8,10));
    let date = new Date(year, month, day, 0, 0, 0, 0);
    return date;
}
