import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DentistaService } from 'src/app/dentista/services/dentista.service';
import { PacienteService } from 'src/app/paciente/services/paciente.service';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { Paciente } from 'src/app/shared/models/paciente.model';
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
  pacientes!: Paciente[];

  constructor(
    private atendimentoService: AtendimentoService,
    private dentistaService: DentistaService,
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.atendimentoService.buscarPorId(id).subscribe(
      (dados: Atendimento) => {
        this.atendimento = dados;
      }
    );
    this.dentistaService.listarTodos().subscribe(
      (dados: Dentista[]) => {
        if(dados == null) {
          this.dentistas = [];
        }
        else {
          this.dentistas = dados;
        }
      }
    );
    this.pacienteService.listarTodos().subscribe(
      (dados: Paciente[]) => {
        if(dados == null) {
          this.pacientes = [];
        }
        else {
          this.pacientes = dados;
        }
      }
    );
  }

  atualizar(): void {
    if (this.formAtendimento.form.valid) {
      this.atendimentoService.atualizar(this.atendimento).subscribe(
        () => this.router.navigate(['/atendimentos'])
      );
    }
  }

  inserirProcedimentoAplicado(): void {
    this.atendimento.procedimentosAplicados!.push(new ProcedimentoAplicado());
  }

  removerProcedimentoAplicado(i: number): void {
    //$event.preventDefault();
    if (confirm('Deseja realmente remover o procedimento "' + this.atendimento.procedimentosAplicados[i].procedimento + '"?')) {
      this.atendimento.procedimentosAplicados!.splice(i, 1);
    }
  }

}
