import { Component, OnInit } from '@angular/core';
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

  dentistas!: Dentista[];
  atendimentos!: Atendimento[];
  datasRepasse!: (string)[];

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
