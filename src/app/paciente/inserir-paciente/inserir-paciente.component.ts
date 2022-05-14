import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Email } from 'src/app/shared/models/email.model';
import { Paciente } from 'src/app/shared/models/paciente.model';
import { TelefoneContato } from 'src/app/shared/models/telefone-contato.model';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-inserir-paciente',
  templateUrl: './inserir-paciente.component.html',
  styleUrls: ['./inserir-paciente.component.css']
})
export class InserirPacienteComponent implements OnInit {

  @ViewChild('formPaciente') formPaciente!: NgForm;

  paciente!: Paciente;

  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.paciente = new Paciente();
  }

  inserir(): void {
    if (this.formPaciente.form.valid) {
      this.pacienteService.inserir(this.paciente).subscribe(
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

}

function hoje(): string {
  let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}
