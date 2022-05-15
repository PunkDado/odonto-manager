import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvenioService } from 'src/app/convenio/services/convenio.service';
import { CondicaoDentePaciente } from 'src/app/shared/models/condicao-dente-paciente.model';
import { Convenio } from 'src/app/shared/models/convenio.model';
import { DadosConvenioPaciente } from 'src/app/shared/models/dados-convenio-paciente.model';
import { Email } from 'src/app/shared/models/email.model';
import { Paciente } from 'src/app/shared/models/paciente.model';
import { TelefoneContato } from 'src/app/shared/models/telefone-contato.model';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent implements OnInit {

  @ViewChild('formPaciente') formPaciente!: NgForm;

  paciente!: Paciente;
  convenios!: Convenio[];
  dentes: string[] = ["11", "21", "31"];
  faces: string[] = ["Vestibular", "Frontal"];
  condicoes: string[] = ["Cárie encontrada", "Cárie restaurada"];
  tiposTelefone: string[] = ["Celular", "Residencial", "Comercial"];

  constructor(
    private pacienteService: PacienteService,
    private convenioService: ConvenioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    let id = +this.route.snapshot.params['id'];
    this.pacienteService.buscarPorId(id).subscribe(
      (dados: Paciente) => {
        this.paciente = dados;
      }
    );

    this.convenioService.listarTodos().subscribe(
      (dados: Convenio[]) => {
        if(dados == null) {
          this.convenios = [];
        }
        else {
          this.convenios = dados;
        }
      }
    );
  }

  atualizar(): void {
    if (this.formPaciente.form.valid) {
      this.pacienteService.atualizar(this.paciente).subscribe(
        () => this.router.navigate(['/pacientes'])
      );
    }
  }

  inserirEmail(): void {
    let email = new Email();
    email.dataAtualizacao = hoje();
    this.paciente.emails!.push(email);
  }

  removerEmail(i: number): void {
    this.paciente.emails!.splice(i, 1);
  }

  inserirTelefoneContato(): void {
    let telefoneContato = new TelefoneContato();
    telefoneContato.dataAtualizacao = hoje();
    this.paciente.telefonesContato!.push(telefoneContato);
  }

  removerTelefoneContato(i: number): void {
    this.paciente.telefonesContato!.splice(i, 1);
  }

  inserirDadosConvenioPaciente(): void {
    let dadosConvenioPaciente = new DadosConvenioPaciente();
    dadosConvenioPaciente.dataInformacao = hoje();
    this.paciente.dadosConvenioPacientes!.push(dadosConvenioPaciente);
  }

  removerDadosConvenioPaciente(i: number): void {
    this.paciente.dadosConvenioPacientes!.splice(i, 1);
  }

  inserirCondicaoDentePaciente(): void {
    let condicaoDentePaciente = new CondicaoDentePaciente();
    condicaoDentePaciente.dataInformacao = hoje();
    this.paciente.condicaoDentePacientes!.push(condicaoDentePaciente);
  }

  removerCondicaoDentePaciente(i: number): void {
    this.paciente.condicaoDentePacientes!.splice(i, 1);
  }

}

function hoje(): string {
  let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}
