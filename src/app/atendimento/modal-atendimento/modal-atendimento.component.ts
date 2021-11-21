import { Component, OnInit, Input } from '@angular/core';
import { Atendimento } from '../../shared/models/atendimento.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-atendimento',
  templateUrl: './modal-atendimento.component.html',
  styleUrls: ['./modal-atendimento.component.css']
})
export class ModalAtendimentoComponent implements OnInit {

  @Input() atendimento!: Atendimento;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  

}
