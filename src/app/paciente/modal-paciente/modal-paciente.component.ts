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

  dentes1: string[] = ['18', '17', '16', '15', '14', '13', '12', '11'];
  dentes2: string[] = ['21', '22', '23', '24', '25', '26', '27', '28'];
  dentes3: string[] = ['48', '47', '46', '45', '44', '43', '42', '41'];
  dentes4: string[] = ['31', '32', '33', '34', '35', '36', '37', '38'];
  dentes5: string[] = ['55', '54', '53', '52', '51'];
  dentes6: string[] = ['61', '62', '63', '64', '65'];
  dentes7: string[] = ['85', '84', '83', '82', '81'];
  dentes8: string[] = ['71', '72', '73', '74', '75'];

  // Estado inicial para o background-color de cada bloco de dentes
  // Estado final para cada face de cada dente do bloco dentes1
  bgColor1: string[][] = [
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"]
  ];

  // Estado final para cada face de cada dente do bloco dentes2
  bgColor2: string[][] = [
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"]
  ];

  // e assim por diante
  bgColor3: string[][] = [
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"]
  ];

  bgColor4: string[][] = [
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"]
  ];

  bgColor5: string[][] = [
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"]
  ];

  bgColor6: string[][] = [
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"]
  ];

  bgColor7: string[][] = [
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"]
  ];

  bgColor8: string[][] = [
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white"]
  ];

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

  setCorDenteBloco1(dente: string, face: number): void {
    let dentes: string[] = this.dentes1;
    let indexDente = dentes.indexOf(dente);
    this.bgColor1[indexDente][face] = nextColor(this.bgColor1[indexDente][face]);
  }

  setCorDenteBloco2(dente: string, face: number): void {
    let dentes: string[] = this.dentes2;
    let indexDente = dentes.indexOf(dente);
    this.bgColor2[indexDente][face] = nextColor(this.bgColor2[indexDente][face]);
  }

  setCorDenteBloco3(dente: string, face: number): void {
    let dentes: string[] = this.dentes3;
    let indexDente = dentes.indexOf(dente);
    this.bgColor3[indexDente][face] = nextColor(this.bgColor3[indexDente][face]);
  }

  setCorDenteBloco4(dente: string, face: number): void {
    let dentes: string[] = this.dentes4;
    let indexDente = dentes.indexOf(dente);
    this.bgColor4[indexDente][face] = nextColor(this.bgColor4[indexDente][face]);
  }

  setCorDenteBloco5(dente: string, face: number): void {
    let dentes: string[] = this.dentes5;
    let indexDente = dentes.indexOf(dente);
    this.bgColor5[indexDente][face] = nextColor(this.bgColor5[indexDente][face]);
  }

  setCorDenteBloco6(dente: string, face: number): void {
    let dentes: string[] = this.dentes6;
    let indexDente = dentes.indexOf(dente);
    this.bgColor6[indexDente][face] = nextColor(this.bgColor6[indexDente][face]);
  }

  setCorDenteBloco7(dente: string, face: number): void {
    let dentes: string[] = this.dentes7;
    let indexDente = dentes.indexOf(dente);
    this.bgColor7[indexDente][face] = nextColor(this.bgColor7[indexDente][face]);
  }

  setCorDenteBloco8(dente: string, face: number): void {
    let dentes: string[] = this.dentes8;
    let indexDente = dentes.indexOf(dente);
    this.bgColor8[indexDente][face] = nextColor(this.bgColor8[indexDente][face]);
  }



}

function nextColor(color: string): string {
  switch (color) {
    case "white": return "lightblue";
    break;
    case "lightblue": return "red";
    break;
    case "red": return "black";
    break;
    default: return  "white";
  }

}