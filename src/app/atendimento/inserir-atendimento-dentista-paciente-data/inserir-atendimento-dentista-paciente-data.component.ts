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
  selector: 'app-inserir-atendimento-dentista-paciente-data',
  templateUrl: './inserir-atendimento-dentista-paciente-data.component.html',
  styleUrls: ['./inserir-atendimento-dentista-paciente-data.component.css']
})
export class InserirAtendimentoDentistaPacienteDataComponent implements OnInit {

  @ViewChild('formAtendimentoDentistaPaciente') formAtendimentoDentistaPaciente!: NgForm;

  atendimento!: Atendimento;
  dentistas!: Dentista[];
  pacientes!: Paciente[];
  dentista!: Dentista;
  paciente!: Paciente;
  dia!: string;
  dentistaId!: number;
  pacienteId!: number;

  constructor(
    private atendimentoService: AtendimentoService,
    private dentistaService: DentistaService,
    private pacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.atendimento = new Atendimento();
    this.atendimento.paciente = "";

    let dentistaId = +this.route.snapshot.params['dentistaId'];
    this.dentistaService.buscarPorId(dentistaId).subscribe(
      (dados: Dentista) => {
        this.dentista = dados;
      }
    );

    let pacienteId = +this.route.snapshot.params['pacienteId'];
    this.pacienteService.buscarPorId(pacienteId).subscribe(
      (dados: Paciente) => {
        this.paciente = dados;
      }
    );

    this.dia = this.route.snapshot.params['dia'];

    this.atendimento.dentista = this.dentista;
    this.atendimento.entPaciente = this.paciente;
    this.atendimento.dataAtendimento = this.dia;

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

  inserir(): void {
    this.atendimento.dentista = this.dentista;
    this.atendimento.entPaciente = this.paciente;
    this.atendimento.dataAtendimento = this.dia;
    if (this.formAtendimentoDentistaPaciente.form.valid) {
      this.atendimentoService.inserir(this.atendimento).subscribe(
        () => this.router.navigate(['/agenda-diaria/' + this.dia])
      );
      
    }
  }

  inserirProcedimentoAplicado(): void {
    this.atendimento.procedimentosAplicados!.push(new ProcedimentoAplicado());
  }

  removerProcedimentoAplicado(i: number): void {
    this.atendimento.procedimentosAplicados!.splice(i, 1);
  }

}
