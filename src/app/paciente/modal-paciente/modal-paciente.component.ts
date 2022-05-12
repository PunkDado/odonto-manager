import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from 'src/app/shared/models/paciente.model';

@Component({
  selector: 'app-modal-paciente',
  templateUrl: './modal-paciente.component.html',
  styleUrls: ['./modal-paciente.component.css']
})
export class ModalPacienteComponent implements OnInit {

  @Input() paciente!: Paciente;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
