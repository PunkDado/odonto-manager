import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DentistaService } from 'src/app/dentista/services/dentista.service';
import { Agenda } from 'src/app/shared/models/agenda.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { ModalAgendaComponent } from '../modal-agenda/modal-agenda.component';
import { AgendaService } from '../services/agenda.service';

@Component({
  selector: 'app-agenda-diaria-dentista',
  templateUrl: './agenda-diaria-dentista.component.html',
  styleUrls: ['./agenda-diaria-dentista.component.css']
})
export class AgendaDiariaDentistaComponent implements OnInit {

  @ViewChild('formAgenda') formAgenda!: NgForm;

  dia!: string;
  datas: string[] = [];
  agendamentos!: Agenda[];
  dentistas!: Dentista[];
  dentistaSelecionado!: Dentista;
  dentistaId!: number;
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
    this.dentistaId = this.route.snapshot.params['dentistaId'];
    this.dia = dia;
    this.listarTodos();
    this.listarDentistas();
    this.listarDentistaSelecionado();
    this.listarDatas();
    this.listarHorarios();
    
  }

  listarTodos(): void {
    this.agendaService.listarTodos().subscribe((dados) => {
      if (dados == null) {
        this.agendamentos = [];
      }
      else {
        this.agendamentos = dados.filter(
          agendamento => agendamento.dentista!.id == this.dentistaId
        );;
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

  listarDentistaSelecionado(): void {
    this.dentistaService.buscarPorId(this.dentistaId).subscribe((dados) => {
        this.dentistaSelecionado = dados;  
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

  /*selecionarAgendaDiariaDentista(): void {
    this.router.navigate(['agenda/' + this.dia + '/' + this.dentistaId]);
  }*/

  selecionarAgendaDiariaDentista(): void {
    this.router.navigate(['agenda/' + this.dia + '/' + this.dentistaId]);
    this.listarTodos();
    this.listarDentistas();
    this.listarDentistaSelecionado();
    this.listarDatas();
    this.listarHorarios();
  }

  setHoje(): void {
    let diaDeHoje: string = hoje().substring(0,10);
    this.dia = diaDeHoje;
    this.router.navigate(['agenda/' + this.dia + '/' + this.dentistaId]);
    this.listarTodos();
    this.listarDentistas();
    this.listarDentistaSelecionado();
    this.listarDatas();
    this.listarHorarios();
  }

  setNovoDia(): void {
    this.router.navigate(['agenda/' + this.dia + '/' + this.dentistaId]);
    this.listarTodos();
    this.listarDentistas();
    this.listarDentistaSelecionado();
    this.listarDatas();
    this.listarHorarios();
  }

  listarDatas(): void {
    // datas: string[] = ["2022-05-30", "2022-05-31", ...]
    // array com 5 strings
    this.datas = [];
    let diaToPush = this.dia;
    for (let i = 0; i < 5; i++) {
      this.datas.push(diaToPush);
      diaToPush = diaPosterior(diaToPush);
    }
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

  listarAgendamentosPorHorarioData(horario: string, data: string): Agenda[] {
    let horarioSemDia: string = horario.substring(11,19);
    let dataHora: string = data + " " + horarioSemDia;
    let agendamentos = this.agendamentos;
    let agendamentosFiltrados = agendamentos
      .filter(
      agendamento => agendamento.dataHora == dataHora
      )
      
    return agendamentosFiltrados;
  }

  listarAgendamentosPorHorarioPorDentista(horario: string, dentistaId: number): Agenda[] {
    //return this.listarAgendamentosPorHorario(horario).filter(
    //  agendamento => agendamento.dentista!.id == dentistaId
    //)

    return [];
  }

  arrowLeft(): void {
    this.dia = diaAnterior(this.dia);
    this.setNovoDia();
    this.listarDatas();
  }

  arrowRight(): void {
    this.dia = diaPosterior(this.dia);
    this.setNovoDia();
    this.listarDatas();
  }

  novoAgendamento(data: string, horario: string): void {
    //[routerLink]="['/agenda/novo/', horario, dentistaId]";
    let hora = horario.substring(11,19);
    this.router.navigate(['agenda/novo/' + data + ' ' + hora + "/" + this.dentistaId]);
  }

  getWeekday(date: string): string {
    return strToWeekday(date);
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

function strToWeekday(strDate: string): string {
  let date = strToDate(strDate);
  let weekdayIndex = date.getDay();
  let weekday: string = "A";
  switch (weekdayIndex) {
    case 0: weekday = "Dom";
    break;
    case 1: weekday = "Seg";
    break;
    case 2: weekday = "Ter";
    break;
    case 3: weekday = "Qua";
    break;
    case 4: weekday = "Qui";
    break;
    case 5: weekday = "Sex";
    break;
    case 6: weekday = "Sáb";
    break;
  }
  return weekday;
}

function diaAnterior(dia: string): string {
  let date = strToDate(dia);
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
    
    return yyyy + '-' + mm + '-' + dd;

}

function diaPosterior(dia: string): string {
  let date = strToDate(dia);
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
    
    return yyyy + '-' + mm + '-' + dd;
    
}
