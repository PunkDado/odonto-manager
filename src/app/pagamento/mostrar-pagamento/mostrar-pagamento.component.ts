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
  dentistaId: number = 0;
  dataRepasse: string = "";
  selectedDentista!: Dentista;
  dentista!: Dentista;
  atendimentos!: Atendimento[];
  datasRepasse!: string[];
  atendimentosPorDentistaPorDataRepasse!: Atendimento[];
  

  constructor(
    private atendimentoService: AtendimentoService,
    private dentistaService: DentistaService,
    private repasseService: RepasseService
  ) { }

  ngOnInit(): void {
    this.listarAtendimentos();
    this.listarDentistas();
    this.listarDatasRepasse();
    this.listarAtendimentosPorDentistaPorDataRepasse(0, "");
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

  listarAtendimentosPorDentistaPorDataRepasse(dentistaId: number, dataRepasse: string): void {

    //this.atendimentosPorDentistaPorDataRepasse.splice(0, this.atendimentosPorDentistaPorDataRepasse.length);
    //this.atendimentosPorDentistaPorDataRepasse = this.atendimentos.slice(this.atendimentos.length);
    
    if (dentistaId == null || dentistaId == 0 || dataRepasse == null || dataRepasse == "") {
      //console.log(this.atendimentos);
      //return this.atendimentos;
      this.atendimentosPorDentistaPorDataRepasse = this.atendimentos;
    }
    /*else if (dentistaId == 0) {
      return this.atendimentos;
    }
    else if (dataRepasse == "") {
      return this.atendimentos;
    }*/
    else {
      //console.log(dentistaId);
      let atendimentosFiltrados: Atendimento[];
      atendimentosFiltrados = this.atendimentos
        .filter(atendimento => atendimento.dentista!.id == dentistaId);
      //console.log("atendimentosFiltrados", atendimentosFiltrados);

      atendimentosFiltrados.forEach(
        atendimento => {
          let procedimentosAplicadosFiltrados: ProcedimentoAplicado[] = [];
          atendimento.procedimentosAplicados.forEach(
            (procedimentoAplicado, index, array) => {
              //console.log("atendimento.procedimentosAplicados", array[index]);
              if (procedimentoAplicado.dataRepasse == dataRepasse) {
                procedimentosAplicadosFiltrados.push(procedimentoAplicado);
                //console.log("procedAplicFiltrados", procedimentosAplicadosFiltrados);
              }
            }
          );
          atendimento.procedimentosAplicados = procedimentosAplicadosFiltrados;
          //console.log("atendimentoFiltrado", atendimento);
        } 
      );

      //console.log("atendimentosFiltradosDataRepasse", atendimentosFiltradosDataRepasse)
      
      
      //return atendimentosFiltrados;
      this.atendimentosPorDentistaPorDataRepasse = atendimentosFiltrados;
      console.log(this.atendimentosPorDentistaPorDataRepasse);
      console.log(this.atendimentos);
    }
  }

  reiniciar(): void {
    this.dataRepasse = "";
    this.dentistaId = 0;
    this.atendimentosPorDentistaPorDataRepasse.splice(0, this.atendimentosPorDentistaPorDataRepasse.length);
    this.atendimentosPorDentistaPorDataRepasse = this.atendimentos.slice(this.atendimentos.length);
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