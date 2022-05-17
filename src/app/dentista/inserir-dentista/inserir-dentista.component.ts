import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { Email } from 'src/app/shared/models/email.model';
import { TelefoneContato } from 'src/app/shared/models/telefone-contato.model';
import { DentistaService } from '../services/dentista.service';

@Component({
  selector: 'app-inserir-dentista',
  templateUrl: './inserir-dentista.component.html',
  styleUrls: ['./inserir-dentista.component.css']
})
export class InserirDentistaComponent implements OnInit {

  @ViewChild('formDentista') formDentista! : NgForm;
  dentista!: Dentista;
  generos: string[] = ["M", "F"];
  tiposTelefone: string[] = ["Celular", "Residencial", "Comercial"];

  constructor(
    private dentistaService: DentistaService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.dentista = new Dentista();
  }

  inserir(): void {
    if(this.formDentista.form.valid) {
      this.dentistaService.inserir(this.dentista).subscribe(
        () => this.router.navigate(["dentistas/"])
      );
    }
    
  }

  inserirEmail(): void {
    let email = new Email();
    email.dataAtualizacao = hoje();
    if (this.dentista.emails!.length == 0) email.principal = true;
    this.dentista.emails!.push(email);
  }

  removerEmail(i: number): void {
    this.dentista.emails!.splice(i, 1);
  }

  inserirTelefoneContato(): void {
    let telefoneContato = new TelefoneContato();
    telefoneContato.dataAtualizacao = hoje();
    if (this.dentista.telefonesContato!.length == 0) telefoneContato.principal = true;
    this.dentista.telefonesContato!.push(telefoneContato);
  }

  removerTelefoneContato(i: number): void {
    this.dentista.telefonesContato!.splice(i, 1);
  }

}

function hoje(): string {
  let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}
