import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AtendimentoService } from 'src/app/atendimento/services/atendimento.service';
import { DentistaService } from 'src/app/dentista/services/dentista.service';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { ProcedimentoAplicado } from 'src/app/shared/models/procedimento-aplicado.model';
import { Repasse } from 'src/app/shared/models/repasse.model';
import { DownloadService } from '../services/download.service';
import { RepasseService } from '../services/repasse.service';

@Component({
  selector: 'app-mostrar-pagamento',
  templateUrl: './mostrar-pagamento.component.html',
  styleUrls: ['./mostrar-pagamento.component.css']
})
export class MostrarPagamentoComponent implements OnInit {

  @ViewChild('formDentistaDataRepasse') formDentistaDataRepasse!: NgForm;

  dentistas: Dentista[] = [];
  //nomeDentista!: string;
  dentistaId!: number;
  dataRepasse!: string;
  //selectedDentista!: Dentista;
  dentista!: Dentista;
  atendimentos!: Atendimento[];
  datasRepasse!: string[];
  //atendimentosPorDentistaPorDataDeRepasse!: Atendimento[];
  

  constructor(
    private atendimentoService: AtendimentoService,
    private dentistaService: DentistaService,
    private repasseService: RepasseService,
    private downloadService: DownloadService
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
    let atendimentosFiltrados: Atendimento[];
    if ((dentistaId == null || dentistaId == 0) && (dataRepasse == null || dataRepasse == "")) {
      //console.log(this.atendimentos);
      return this.atendimentos;
    }
    else if (dentistaId == null || dentistaId == 0) {
      //return this.atendimentos;
      atendimentosFiltrados = this.atendimentos;

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

      return atendimentosFiltrados;
    }
    else if (dataRepasse == null || dataRepasse == "") {
      //return this.atendimentos;
      atendimentosFiltrados = this.atendimentos
        .filter(atendimento => atendimento.dentista!.id == dentistaId);
      return atendimentosFiltrados;
    }
    else {
      //console.log(dentistaId);
      //let atendimentosFiltrados: Atendimento[];
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
      
      return atendimentosFiltrados;
    }
  }

  reiniciar(): void {
    this.dataRepasse = "";
    this.dentistaId = 0;
    this.listarAtendimentosPorDentistaPorDataRepasse(0,"");
  }

  setDentistaDataRepasse(dentista: Dentista, dataRepasse: string): void {
    this.dataRepasse = dataRepasse;
    this.dentistaId = dentista.id!;
  }

  downloadReport(): void {
    let atendimentosToDownload: Atendimento[] = this.listarAtendimentosPorDentistaPorDataRepasse(this.dentistaId, this.dataRepasse);
    if (this.dentistaId == undefined) {
      atendimentosToDownload = this.atendimentos;
    }
    
    //console.log(this.dentistaId);
    let filename: string = getFilename(this.dentistaId) + "_" + this.dataRepasse;
    this.downloadService.downloadFile(atendimentosToDownload, filename);
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

function getFilename(dentistaId: number): string {
  /*if (dentistaId == 0) {
    return "Todos_os_atendimentos";
  }
  else {
    return this.dentistas.filter(
      dentista => dentista.id == dentistaId
    ).nomeDentista;
  }*/
  if (dentistaId == undefined) {
    return "atendimentos_"
  }
  else {
    return "atendimentos_" + dentistaId.toString();
  }
  
  
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
