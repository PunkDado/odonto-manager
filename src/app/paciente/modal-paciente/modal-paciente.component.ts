import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AtendimentoService } from 'src/app/atendimento/services/atendimento.service';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { Paciente } from 'src/app/shared/models/paciente.model';

@Component({
  selector: 'app-modal-paciente',
  templateUrl: './modal-paciente.component.html',
  styleUrls: ['./modal-paciente.component.css']
})
export class ModalPacienteComponent implements OnInit {

  @Input() paciente!: Paciente;
  atendimentos!: Atendimento[];

  constructor(
    public activeModal: NgbActiveModal,
    public atendimentoService: AtendimentoService
    ) { }

  ngOnInit(): void {
    this.atendimentoService.listarAtendimentosPorPaciente(this.paciente).subscribe((dados) => {
      if (dados == null) {
        this.atendimentos = [];
      }
      else {
        this.atendimentos = dados;
      }
    });
  }

}
