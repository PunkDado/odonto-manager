import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
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
  dentistas!: Dentista[];

  constructor(
    private atendimentoService: AtendimentoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.atendimentoService.buscarPorId(id)!;
    this.atendimentoService.listarTodos().subscribe(
      (dados: Dentista[]) => {
        if(dados == null) {
          this.dentistas = [];
        }
        else {
          this.dentistas = dados;
        }
      }
    )
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
