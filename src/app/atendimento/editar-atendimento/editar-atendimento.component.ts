import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { ProcedimentoAplicado } from '../../shared/models/procedimento-aplicado.model';
import { AtendimentoService } from '../services/atendimento.service';

@Component({
  selector: 'app-editar-atendimento',
  templateUrl: './editar-atendimento.component.html',
  styleUrls: ['./editar-atendimento.component.css']
})
export class EditarAtendimentoComponent implements OnInit {

  @ViewChild('formAtendimento') formAtendimento!: NgForm;

  atendimento!: Atendimento;

  constructor(
    private atendimentoService: AtendimentoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.atendimento = this.atendimentoService.buscarPorId(id)!;
  }

  atualizar(): void {
    if (this.formAtendimento.form.valid) {
      this.atendimentoService.atualizar(this.atendimento);
      this.router.navigate(['/atendimentos']);
    }
  }

  inserirProcedimentoAplicado(): void {
    this.atendimento.procedimentosAplicados!.push(new ProcedimentoAplicado());
    
  }

}
