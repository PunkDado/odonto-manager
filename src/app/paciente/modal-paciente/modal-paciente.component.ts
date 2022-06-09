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
  rodape: string = "";
  backgroundColor = "white";
  dentes1: string[] = ['18', '17', '16', '15', '14', '13', '12', '11'];
  dentes2: string[] = ['21', '22', '23', '24', '25', '26', '27', '28'];
  dentes3: string[] = ['48', '47', '46', '45', '44', '43', '42', '41'];
  dentes4: string[] = ['31', '32', '33', '34', '35', '36', '37', '38'];
  dentes5: string[] = ['18', '17', '16', '15', '14', '13', '12', '11'];
  dentes6: string[] = ['18', '17', '16', '15', '14', '13', '12', '11'];
  dentes7: string[] = ['18', '17', '16', '15', '14', '13', '12', '11'];
  dentes8: string[] = ['18', '17', '16', '15', '14', '13', '12', '11'];

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

  setRodape(): void {
    if (this.backgroundColor == "white") {
      this.backgroundColor = "red";
    } 
    else {
      this.backgroundColor = "white";
    }
  }

}
