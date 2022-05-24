import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agenda-diaria',
  templateUrl: './agenda-diaria.component.html',
  styleUrls: ['./agenda-diaria.component.css']
})
export class AgendaDiariaComponent implements OnInit {

  dia!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let dia = this.route.snapshot.params['dia'];
    this.dia = dia;
  }

}
