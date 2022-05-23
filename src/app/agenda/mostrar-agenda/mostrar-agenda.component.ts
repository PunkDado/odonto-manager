
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DentistaService } from 'src/app/dentista/services/dentista.service';
import { Agenda } from 'src/app/shared/models/agenda.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { AgendaService } from '../services/agenda.service';

@Component({
  selector: 'app-mostrar-agenda',
  templateUrl: './mostrar-agenda.component.html',
  styleUrls: ['./mostrar-agenda.component.css']
})
export class MostrarAgendaComponent implements OnInit {

  @ViewChild('formAgenda') formAgenda!: NgForm;

  /*semana1: string[] = ["1", "2", "3", "4", "5", "6", "7"];
  semana2: string[] = ["8", "9", "10", "11", "12", "13", "14"];
  semana3: string[] = ["15", "16", "17", "18", "19", "20", "21"];
  semana4: string[] = ["22", "23", "24", "25", "26", "27", "28"];
  semana5: string[] = ["29", "30", "31", "", "", "", ""];*/

  semana1: string[] = ["", "", "", "", "", "", ""];
  semana2: string[] = ["", "", "", "", "", "", ""];
  semana3: string[] = ["", "", "", "", "", "", ""];
  semana4: string[] = ["", "", "", "", "", "", ""];
  semana5: string[] = ["", "", "", "", "", "", ""];
  semana6: string[] = ["", "", "", "", "", "", ""];

  agendamentos!: Agenda[];
  dentistas!: Dentista[];
  dentistaId!: number;
  mes!: string;
  primeiroDia!: string;

  constructor(
    private agendaService: AgendaService,
    private dentistaService: DentistaService
  ) { }

  ngOnInit(): void {
    this.listarTodos();
    this.listarDentistas();
    this.setMesAtual();
    this.montaMes();
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

  arrowLeft(): void {
    let date = new Date(this.mes);
    
    let dd = "01";
    let mm = String(date.getMonth() + 2 - 1).padStart(2, '0'); //January is 11
    let yyyy = date.getFullYear();
    if (date.getMonth() == 11) {
      //yyyy--
    } else if (date.getMonth() == 0) {
      //yyyy++
    }

    this.mes = yyyy + '-' + mm + '-' + dd;
    
  }

  arrowRight(): void {
    /*let i = this.meses.indexOf(this.mes);
    if (i < this.meses.length - 1) {
      this.mes = this.meses[i + 1];
    }*/

    let date = new Date(this.mes);
    
    let dd = "01";
    let mm = String(date.getMonth() + 2 + 1).padStart(2, '0'); //January is 11
    let yyyy = date.getFullYear();
    if (date.getMonth() == 10) {
      mm = '01';
      //yyyy = yyyy + 2
    }
    else if (date.getMonth() == 11) {
      mm = '02';
    }
    

    this.mes = yyyy + '-' + mm + '-' + dd;

  }

  montaMes(): void {
    this.semana1 = ["", "", "", "", "", "", ""];
    this.semana2 = ["", "", "", "", "", "", ""];
    this.semana3 = ["", "", "", "", "", "", ""];
    this.semana4 = ["", "", "", "", "", "", ""];
    this.semana5 = ["", "", "", "", "", "", ""];
    this.semana6 = ["", "", "", "", "", "", ""];
  
    let date = new Date(this.mes);
    let mm = String(date.getMonth() + 2).padStart(2, '0'); //January is 11
    if (date.getMonth() == 11) {
      mm = '01';
    }
    let yyyy = date.getFullYear();
    let primeiroDiaDaSemana: number = date.getDay();
    let numeroDiasMes: number = 31;

    if ([2, 4, 7, 9].includes(date.getMonth())) {
      numeroDiasMes = 30;
    }
    else if (date.getMonth() == 0) {
      if (yyyy % 4 == 0) {
        numeroDiasMes = 29;
      } 
      else {
        numeroDiasMes = 28;
      }
      
    }
    
    let dia = 1;
    for(let diaDaSemana = primeiroDiaDaSemana; diaDaSemana < 7; diaDaSemana++) {
      this.semana1[diaDaSemana] = yyyy + "-" + mm + "-" + String(dia).padStart(2, '0');
      dia++;
    }
    for(let diaDaSemana = 0; diaDaSemana < 7; diaDaSemana++) {
      this.semana2[diaDaSemana] = yyyy + "-" + mm + "-" + String(dia).padStart(2, '0');
      dia++;
    }
    for(let diaDaSemana = 0; diaDaSemana < 7; diaDaSemana++) {
      this.semana3[diaDaSemana] = yyyy + "-" + mm + "-" + String(dia).padStart(2, '0');
      dia++;
    }
    for(let diaDaSemana = 0; diaDaSemana < 7; diaDaSemana++) {
      this.semana4[diaDaSemana] = yyyy + "-" + mm + "-" + String(dia).padStart(2, '0');
      dia++;
    }
    for(let diaDaSemana = 0; diaDaSemana < 7; diaDaSemana++) {
      if(dia <= numeroDiasMes) {
        this.semana5[diaDaSemana] = yyyy + "-" + mm + "-" + String(dia).padStart(2, '0');
      }
      dia++;
    }
    for(let diaDaSemana = 0; diaDaSemana < 7; diaDaSemana++) {
      if (dia <= numeroDiasMes) {
        this.semana6[diaDaSemana] = yyyy + "-" + mm + "-" + String(dia).padStart(2, '0');
      }
      dia++;
    }

  }

  setMesAtual(): void {
    this.mes = mesAtual();
  }

}

function hoje(): string {
  let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

function mesAtual(): string {
  let today = new Date();
    var dd = "01";
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}
