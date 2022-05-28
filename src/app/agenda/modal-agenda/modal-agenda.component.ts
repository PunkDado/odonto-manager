import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Agenda } from 'src/app/shared/models/agenda.model';

@Component({
  selector: 'app-modal-agenda',
  templateUrl: './modal-agenda.component.html',
  styleUrls: ['./modal-agenda.component.css']
})
export class ModalAgendaComponent implements OnInit {

  @Input() agenda!: Agenda;

  constructor(public activeModal: NgbActiveModal ) { }

  ngOnInit(): void {
  }

}
