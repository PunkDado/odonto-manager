import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agenda } from 'src/app/shared/models/agenda.model';
import { Dentista } from 'src/app/shared/models/dentista.model';

@Component({
  selector: 'app-agenda-diaria',
  templateUrl: './agenda-diaria.component.html',
  styleUrls: ['./agenda-diaria.component.css']
})
export class AgendaDiariaComponent implements OnInit {

  dia!: string;
  agendamentos!: Agenda[];
  dentistas!: Dentista[];
  dentistaId!: number | undefined;
  mes!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let dia = this.route.snapshot.params['dia'];
    this.dia = dia;
  }

}
