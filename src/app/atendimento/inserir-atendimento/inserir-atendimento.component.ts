import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { ProcedimentoAplicado } from 'src/app/shared/models/procedimento-aplicado.model';
import { AtendimentoService } from '../services/atendimento.service';
//import { ProcedimentoAplicadoService } from 'src/app/procedimento-aplicado/services/procedimento-aplicado.service';

@Component({
  selector: 'app-inserir-atendimento',
  templateUrl: './inserir-atendimento.component.html',
  styleUrls: ['./inserir-atendimento.component.css']
})
export class InserirAtendimentoComponent implements OnInit {

  @ViewChild('formAtendimento') formAtendimento!: NgForm;

  atendimento!: Atendimento;

  constructor(
    private atendimentoService: AtendimentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.atendimento = new Atendimento();
  }

  inserir(): void {
    if(this.formAtendimento.form.valid) {
      this.atendimentoService.inserir(this.atendimento);
      this.router.navigate(['/atendimentos']);
    }
  }

  inserirProcedimentoAplicado(): void {
    this.atendimento.procedimentosAplicados!.push(new ProcedimentoAplicado());
    
  }

}
