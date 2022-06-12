import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AtendimentoService } from 'src/app/atendimento/services/atendimento.service';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { CondicaoDentePaciente } from 'src/app/shared/models/condicao-dente-paciente.model';
import { Dente } from 'src/app/shared/models/dente.model';
import { Paciente } from 'src/app/shared/models/paciente.model';
import { PacienteService } from '../services/paciente.service';

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

  denteFormat: string[][] = [
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white'],
    ['white', 'white', 'white', 'white', 'white']
  ];

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
    public atendimentoService: AtendimentoService,
    public pacienteService: PacienteService
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

    // Precisa preencher a cor dos dentes conforme a condição de cada face
    this.setCorInicialDentes();
    this.setCorInicialBackgroundDentes();
  }

  setCorDenteBloco1(dente: string, face: number): void {
    let dentes: string[] = this.dentes1;
    let indexDente = dentes.indexOf(dente);
    if (face == 5) {
      let bgColor = nextBgColor(this.denteFormat[0][indexDente]);
      this.denteFormat[0][indexDente] = bgColor;
      this.persisteCondicaoDentePaciente(dente, face, bgColor);
    }
    else {
      let color = nextColor(this.bgColor1[indexDente][face]);
      this.bgColor1[indexDente][face] = color;
      this.persisteCondicaoDentePaciente(dente, face, color);
    }
  }

  setCorDenteBloco2(dente: string, face: number): void {
    let dentes: string[] = this.dentes2;
    let indexDente = dentes.indexOf(dente);
    if (face == 5) {
      let bgColor = nextBgColor(this.denteFormat[1][indexDente]);
      this.denteFormat[1][indexDente] = bgColor;
      this.persisteCondicaoDentePaciente(dente, face, bgColor);
    }
    else {
      let color = nextColor(this.bgColor2[indexDente][face]);
      this.bgColor2[indexDente][face] = color;
      this.persisteCondicaoDentePaciente(dente, face, color);
    }
  }

  setCorDenteBloco3(dente: string, face: number): void {
    let dentes: string[] = this.dentes3;
    let indexDente = dentes.indexOf(dente);
    if (face == 5) {
      let bgColor = nextBgColor(this.denteFormat[2][indexDente]);
      this.denteFormat[2][indexDente] = bgColor;
      this.persisteCondicaoDentePaciente(dente, face, bgColor);
    }
    else {
      let color = nextColor(this.bgColor3[indexDente][face]);
      this.bgColor3[indexDente][face] = color;
      this.persisteCondicaoDentePaciente(dente, face, color);
    }
  }

  setCorDenteBloco4(dente: string, face: number): void {
    let dentes: string[] = this.dentes4;
    let indexDente = dentes.indexOf(dente);
    if (face == 5) {
      let bgColor = nextBgColor(this.denteFormat[3][indexDente]);
      this.denteFormat[3][indexDente] = bgColor;
      this.persisteCondicaoDentePaciente(dente, face, bgColor);
    }
    else {
    let color = nextColor(this.bgColor4[indexDente][face]);
    this.bgColor4[indexDente][face] = color;
    this.persisteCondicaoDentePaciente(dente, face, color);
    }
  }

  setCorDenteBloco5(dente: string, face: number): void {
    let dentes: string[] = this.dentes5;
    let indexDente = dentes.indexOf(dente);
    if (face == 5) {
      let bgColor = nextBgColor(this.denteFormat[4][indexDente]);
      this.denteFormat[4][indexDente] = bgColor;
      this.persisteCondicaoDentePaciente(dente, face, bgColor);
    }
    else {
      let color = nextColor(this.bgColor5[indexDente][face]);
      this.bgColor5[indexDente][face] = color;
      this.persisteCondicaoDentePaciente(dente, face, color);
    }
  }

  setCorDenteBloco6(dente: string, face: number): void {
    let dentes: string[] = this.dentes6;
    let indexDente = dentes.indexOf(dente);
    if (face == 5) {
      let bgColor = nextBgColor(this.denteFormat[5][indexDente]);
      this.denteFormat[5][indexDente] = bgColor;
      this.persisteCondicaoDentePaciente(dente, face, bgColor);
    }
    else {
      let color = nextColor(this.bgColor6[indexDente][face]);
      this.bgColor6[indexDente][face] = color;
      this.persisteCondicaoDentePaciente(dente, face, color);
    }
  }

  setCorDenteBloco7(dente: string, face: number): void {
    let dentes: string[] = this.dentes7;
    let indexDente = dentes.indexOf(dente);
    if (face == 5) {
      let bgColor = nextBgColor(this.denteFormat[6][indexDente]);
      this.denteFormat[6][indexDente] = bgColor;
      this.persisteCondicaoDentePaciente(dente, face, bgColor);
    }
    else {
      let color = nextColor(this.bgColor7[indexDente][face]);
      this.bgColor7[indexDente][face] = color;
      this.persisteCondicaoDentePaciente(dente, face, color);
    }
  }

  setCorDenteBloco8(dente: string, face: number): void {
    let dentes: string[] = this.dentes8;
    let indexDente = dentes.indexOf(dente);
    if (face == 5) {
      let bgColor = nextBgColor(this.denteFormat[7][indexDente]);
      this.denteFormat[7][indexDente] = bgColor;
      this.persisteCondicaoDentePaciente(dente, face, bgColor);
    }
    else {
      let color = nextColor(this.bgColor8[indexDente][face]);
      this.bgColor8[indexDente][face] = color;
      this.persisteCondicaoDentePaciente(dente, face, color);
    }
  }

  // Precisa preencher a cor dos dentes conforme a condição de cada face
  setCorInicialDentes(): void {
    let dentes!: string[];
    let indexDente!: number;
    for (let condicao of this.paciente.condicaoDentePacientes) {

      switch (condicao.dente?.slice(0,1)) {
        case "1": 
          dentes = this.dentes1;
          indexDente = dentes.indexOf(condicao.dente);
          this.bgColor1[indexDente][faceIndex(condicao.face!)] = corInicial(condicao.condicao!);
          break;
        case "2":
          dentes = this.dentes2;
          indexDente = dentes.indexOf(condicao.dente);
          this.bgColor2[indexDente][faceIndex(condicao.face!)] = corInicial(condicao.condicao!);
          break;
        case "4":
          dentes = this.dentes3;
          indexDente = dentes.indexOf(condicao.dente);
          this.bgColor3[indexDente][faceIndex(condicao.face!)] = corInicial(condicao.condicao!);
          break;
        case "3":
          dentes = this.dentes4;
          indexDente = dentes.indexOf(condicao.dente);
          this.bgColor4[indexDente][faceIndex(condicao.face!)] = corInicial(condicao.condicao!);
          break;
        case "5":
          dentes = this.dentes5;
          indexDente = dentes.indexOf(condicao.dente);
          this.bgColor5[indexDente][faceIndex(condicao.face!)] = corInicial(condicao.condicao!);
          break;
        case "6":
          dentes = this.dentes6;
          indexDente = dentes.indexOf(condicao.dente);
          this.bgColor6[indexDente][faceIndex(condicao.face!)] = corInicial(condicao.condicao!);
          break;
        case "8":
          dentes = this.dentes7;
          indexDente = dentes.indexOf(condicao.dente);
          this.bgColor7[indexDente][faceIndex(condicao.face!)] = corInicial(condicao.condicao!);
          break;
        case "7":
          dentes = this.dentes8;
          indexDente = dentes.indexOf(condicao.dente);
          this.bgColor8[indexDente][faceIndex(condicao.face!)] = corInicial(condicao.condicao!);
          break;
      }

    }
  }

  setCorInicialBackgroundDentes(): void {
    let dentes!: string[];
    let indexDente!: number;
    for (let condicao of this.paciente.condicaoDentePacientes) {

      let blocoDeDentes = +(condicao.dente!.slice(0,1));
      let indexBloco = blocoDeDentes - 1;
      switch (condicao.dente?.slice(0,1)) {
        case "1": 
          dentes = this.dentes1;
          indexDente = dentes.indexOf(condicao.dente);
          this.denteFormat[indexBloco][indexDente] = corInicialBackgroundDente(condicao.condicao!);
          break;
        case "2":
          dentes = this.dentes2;
          indexDente = dentes.indexOf(condicao.dente);
          this.denteFormat[indexBloco][indexDente] = corInicialBackgroundDente(condicao.condicao!);
          break;
        case "4":
          dentes = this.dentes3;
          indexDente = dentes.indexOf(condicao.dente);
          this.denteFormat[indexBloco][indexDente] = corInicialBackgroundDente(condicao.condicao!);
          break;
        case "3":
          dentes = this.dentes4;
          indexDente = dentes.indexOf(condicao.dente);
          this.denteFormat[indexBloco][indexDente] = corInicialBackgroundDente(condicao.condicao!);
          break;
        case "5":
          dentes = this.dentes5;
          indexDente = dentes.indexOf(condicao.dente);
          this.denteFormat[indexBloco][indexDente] = corInicialBackgroundDente(condicao.condicao!);
          break;
        case "6":
          dentes = this.dentes6;
          indexDente = dentes.indexOf(condicao.dente);
          this.denteFormat[indexBloco][indexDente] = corInicialBackgroundDente(condicao.condicao!);
          break;
        case "8":
          dentes = this.dentes7;
          indexDente = dentes.indexOf(condicao.dente);
          this.denteFormat[indexBloco][indexDente] = corInicialBackgroundDente(condicao.condicao!);
          break;
        case "7":
          dentes = this.dentes8;
          indexDente = dentes.indexOf(condicao.dente);
          this.denteFormat[indexBloco][indexDente] = corInicialBackgroundDente(condicao.condicao!);
          break;
      }

    }
  }

  persisteCondicaoDentePaciente(dente: string, faceIndex: number, color: string): void {

    let novaCondicao: CondicaoDentePaciente = new CondicaoDentePaciente();
    novaCondicao.dente = dente;

    if (faceIndex == 5) {
      //novaCondicao.face = "";
      novaCondicao.condicao = condicaoFromBackgroundDenteColor(color);
    }
    else {
      novaCondicao.face = faceFromIndex(dente, faceIndex);
      novaCondicao.condicao = condicaoFromColor(color);
    }
    novaCondicao.dataInformacao = String(new Date());
    this.paciente.condicaoDentePacientes.push(novaCondicao);
    this.pacienteService.atualizar(this.paciente).subscribe();
  }

}

function nextColor(color: string): string {
  switch (color) {
    case "white": return "red";
    break;
    case "red": return "gray";
    break;
    default: return  "white";
  }
}

function nextBgColor(color: string): string {
  switch (color) {
    case "white": return "black";
    break;
    //case "black": return "yellow";
    //break;
    default: return  "white";
  }
}

function corInicial(condicao: string): string {
  switch (condicao) {
    case "Cárie encontrada": return "red";
    break;
    case "Cárie restaurada": return "gray";
    break;
    default: return "white";
  }
}

function corInicialBackgroundDente(condicao: string): string {
  switch (condicao) {
    case "Dente faltante": return "black";
    break;
    case "Prótese encontrada": return "yellow";
    break;
    default: return "white";
  }
}

function condicaoFromColor(color: string): string {
  switch (color) {
    case "red": return "Cárie encontrada";
    break;
    case "gray": return "Cárie restaurada";
    break;
    default: return "Dente íntegro";
  }
}

function condicaoFromBackgroundDenteColor(color: string): string {
  switch (color) {
    case "black": return "Dente faltante";
    break;
    case "yellow": return "Prótese encontrada";
    break;
    default: return "Dente íntegro";
  }
}

function faceIndex(face: string): number {
  switch (face) {
    case "Vestibular": return 0;
    break;
    case "Palatino": return 1;
    break;
    case "Lingual": return 1;  
    break;
    case "Mesial": return 2;
    break;
    case "Distal": return 3;
    break;
    case "Incisal": return 4;
    break;
    case "Oclusal": return 4;
    break;
    default: return  5;
  }
}

function faceFromIndex(dente: string, faceIndex: number) {
  switch (faceIndex) {
    case 0: return "Vestibular";
    break;
    case 1: {
      return "Palatino";
      //return "Lingual";
    }
    break;
    case 2: return "Mesial";
    break;
    case 3: return "Distal";
    break;
    case 4: {
      return "Incisal";
      //return "Oclusal";
    }
    break;
    default: return  "";
  }
}

// ["Vestibular", "Palatino", "Lingual", "Mesial", "Distal", "Incisal", "Oclusal"]