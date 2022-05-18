import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcedimentoService } from 'src/app/procedimento/services/procedimento.service';
import { ContaBancariaDentista } from 'src/app/shared/models/conta-bancaria-dentista.model';
import { DentistaProcedimento } from 'src/app/shared/models/dentista-procedimento.model';
import { DentistaTipoProcedimento } from 'src/app/shared/models/dentista-tipo-procedimento.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { Email } from 'src/app/shared/models/email.model';
import { Procedimento } from 'src/app/shared/models/procedimento.model';
import { TelefoneContato } from 'src/app/shared/models/telefone-contato.model';
import { TipoProcedimento } from 'src/app/shared/models/tipo-procedimento.model';
import { TipoProcedimentoService } from 'src/app/tipo-procedimento/services/tipo-procedimento.service';
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
  bancos: string[] = [
    "237-BRADESCO",
    "341-ITAU",
    "001-BANCO DO BRASIL",
    "033-SANTANDER",
    "104-CAIXA ECONÔMICA FEDERAL"
  ];
  procedimentos!: Procedimento[];
  tiposProcedimento!: TipoProcedimento[];

  constructor(
    private dentistaService: DentistaService,
    private procedimentoService: ProcedimentoService,
    private tipoProcedimentoService: TipoProcedimentoService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.dentista = new Dentista();
    
    this.procedimentoService.listarTodos().subscribe(
      (dados: Procedimento[]) => {
        if(dados == null) {
          this.procedimentos = [];
        }
        else {
          this.procedimentos = dados;
        }
      }
    );

    this.tipoProcedimentoService.listarTodos().subscribe(
      (dados: TipoProcedimento[]) => {
        if(dados == null) {
          this.tiposProcedimento = [];
        }
        else {
          this.tiposProcedimento = dados;
        }
      }
    );
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

  inserirContaBancariaDentista(): void {
    let contaBancariaDentista = new ContaBancariaDentista();
    contaBancariaDentista.dataAtualizacao = hoje();
    if (this.dentista.contasBancariasDentista!.length == 0) contaBancariaDentista.principal = true;
    this.dentista.contasBancariasDentista!.push(contaBancariaDentista);
  }

  removerContaBancariaDentista(i: number): void {
    this.dentista.contasBancariasDentista!.splice(i, 1);
  }

  inserirDentistaProcedimento(): void {
    let dentistaProcedimento = new DentistaProcedimento();
    dentistaProcedimento.dataAtualizacao = hoje();
    this.dentista.dentistaProcedimentos!.push(dentistaProcedimento);
  }

  removerDentistaProcedimento(i: number): void {
    this.dentista.dentistaProcedimentos!.splice(i, 1);
  }

  inserirDentistaTipoProcedimento(): void {
    let dentistaTipoProcedimento = new DentistaTipoProcedimento();
    dentistaTipoProcedimento.dataAtualizacao = hoje();
    this.dentista.dentistaTiposProcedimentos!.push(dentistaTipoProcedimento);
  }

  removerDentistaTipoProcedimento(i: number): void {
    this.dentista.dentistaTiposProcedimentos!.splice(i, 1);
  }

}

function hoje(): string {
  let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}
