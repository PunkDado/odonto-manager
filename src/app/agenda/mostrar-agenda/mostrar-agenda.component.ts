import { Component, OnInit } from '@angular/core';
import { Agenda } from 'src/app/shared/models/agenda.model';
import { AgendaService } from '../services/agenda.service';

@Component({
  selector: 'app-mostrar-agenda',
  templateUrl: './mostrar-agenda.component.html',
  styleUrls: ['./mostrar-agenda.component.css']
})
export class MostrarAgendaComponent implements OnInit {

  semana1: string[] = ["1", "2", "3", "4", "5", "6", "7"];
  semana2: string[] = ["8", "9", "10", "11", "12", "13", "14"];
  semana3: string[] = ["15", "16", "17", "18", "19", "20", "21"];
  semana4: string[] = ["22", "23", "24", "25", "26", "27", "28"];
  semana5: string[] = ["29", "30", "31", "", "", "", ""];

  agendamentos!: Agenda[];

  constructor(
    private agendaService: AgendaService
  ) { }

  ngOnInit(): void {
    this.listarTodos();
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

}
