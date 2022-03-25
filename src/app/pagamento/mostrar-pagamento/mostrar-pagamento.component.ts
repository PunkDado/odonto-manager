import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AtendimentoService } from 'src/app/atendimento/services/atendimento.service';
import { DentistaService } from 'src/app/dentista/services/dentista.service';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { ProcedimentoAplicado } from 'src/app/shared/models/procedimento-aplicado.model';
import { Repasse } from 'src/app/shared/models/repasse.model';
import { RepasseService } from '../services/repasse.service';

@Component({
  selector: 'app-mostrar-pagamento',
  templateUrl: './mostrar-pagamento.component.html',
  styleUrls: ['./mostrar-pagamento.component.css']
})
export class MostrarPagamentoComponent implements OnInit {

  @ViewChild('formDentistaDataRepasse') formDentistaDataRepasse!: NgForm;

  dentistas!: Dentista[];
  nomeDentista!: string;
  dentistaId!: number;
  dataRepasse!: string;
  selectedDentista!: Dentista;
  dentista!: Dentista;
  atendimentos!: Atendimento[];
  datasRepasse!: string[];
  

  constructor(
    private atendimentoService: AtendimentoService,
    private dentistaService: DentistaService,
    private repasseService: RepasseService
  ) { }

  ngOnInit(): void {
    this.listarAtendimentos();
    this.listarDentistas();
    this.listarDatasRepasse();
    
  }

  listarAtendimentos(): void {
    this.atendimentoService.listarTodos().subscribe((dados) => {
      if (dados == null) {
        this.atendimentos = [];
        //this.size = this.atendimentos.length;
      }
      else {
        this.atendimentos = dados;
        //this.size = this.atendimentos.length;
      }
    });
  }

  listarDentistas(): void {
    this.dentistaService.listarTodos().subscribe(
      (dados: Dentista[]) => {
        if (dados == null){
          this.dentistas = []
        }
        else {
          this.dentistas = dados;
        }
      });
  }

  listarDatasRepasse(): void {
    this.repasseService.listarTodos().subscribe(
      (repasses: Repasse[]) => {
        if (repasses == null) {
          this.datasRepasse = [];
        }
        else {
          this.datasRepasse = repasses.map(repasse => repasse.dataRepasse!);
        }
      }
    )  
  }

  repassesDentistas(dentista: Dentista): number[] {
    
    let totalRepassesPorDataRepasse:number[] = [];
    
    let atendimentosDentista: Atendimento[] = [];
    for(let atendimento of this.atendimentos) {
      if(atendimento.dentista?.id == dentista?.id) {
        atendimentosDentista.push(atendimento);
      }
      
    }

    //Para cada data de repasses, calcula o valorRepassado ao dentista
    for(let dataRepasse of this.datasRepasse) {

      let procedimentosAplicadosDentista: ProcedimentoAplicado[] =
        procedimentosAplicadosAtendimentos(atendimentosDentista);

      let procedimentosAplicadosDentistaData: ProcedimentoAplicado[] = 
        procedimentosAplicadosDentista.filter(
          procedimentoAplicadoDentista => procedimentoAplicadoDentista.dataRepasse == dataRepasse
        );
      
      let repasse: number = sumValorRepassado(procedimentosAplicadosDentistaData);

      totalRepassesPorDataRepasse.push(repasse);
    }
    
    return totalRepassesPorDataRepasse;
  }

  listarAtendimentosPorDentistaPorDataRepasse(dentistaId: number, dataRepasse: string): Atendimento[] {
    if (dentistaId == null) {
      //console.log(this.atendimentos);
      return this.atendimentos;
    }
    else if (dentistaId == 0) {
      return this.atendimentos;
    }
    else {
      console.log(dentistaId);
      let atendimentosFiltrados: Atendimento[];
      atendimentosFiltrados = this.atendimentos
        .filter(atendimento => atendimento.dentista!.id == dentistaId);
      console.log("Dentista", atendimentosFiltrados);

      /*let atendimentosPorDataRepasse: Atendimento[] = [];
      atendimentosFiltrados.forEach(
        (atendimento, index, array) => {
          atendimentosPorDataRepasse[index] = atendimento;
          atendimentosPorDataRepasse[index].procedimentosAplicados = [];
        } 
      );
      console.log("Data repasse", atendimentosPorDataRepasse);*/
      
      return atendimentosFiltrados;
    }
  }

}

function sumValorRepassado(procedimentosAplicados: ProcedimentoAplicado[]): number {
  let sum: number = 0;
  procedimentosAplicados.forEach(
    (procedimentoAplicado, index, array) => sum = sum + procedimentoAplicado.valorRepassado!
    );
  return sum;
}

function procedimentosAplicadosAtendimentos(atendimentos: Atendimento[]): ProcedimentoAplicado[] {
  let procedimentosAplicadosAtendimentos: ProcedimentoAplicado[] = [];
  let arrayDeProcedimentosAplicados = atendimentos.map(
    atendimento => atendimento.procedimentosAplicados
  );
  arrayDeProcedimentosAplicados.forEach(
    (procedimentosAplicados) => procedimentosAplicadosAtendimentos = procedimentosAplicadosAtendimentos.concat(procedimentosAplicados)
  );
  return procedimentosAplicadosAtendimentos;
}

/*
listarAtendimentosPorDentista(dentista: Dentista): Atendimento[] {
    if (typeof dentista === "undefined") {
      console.log("indefinido");
      return this.atendimentos;
    }
    else {
      console.log(dentista.nomeDentista);
      return this.atendimentos.filter(
        atendimentos => atendimentos.dentista!.id == dentista!.id
      );
    } 
  }
*/
