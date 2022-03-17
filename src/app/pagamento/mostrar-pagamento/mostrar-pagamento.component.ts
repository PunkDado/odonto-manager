import { Component, OnInit } from '@angular/core';
import { AtendimentoService } from 'src/app/atendimento/services/atendimento.service';
import { DentistaService } from 'src/app/dentista/services/dentista.service';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
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
  datasRepasse!: (string | undefined)[];
  valoresRepassados!: number[][];

  constructor(
    private atendimentoService: AtendimentoService,
    private dentistaService: DentistaService,
    private repasseService: RepasseService
  ) { }

  ngOnInit(): void {
    this.listarAtendimentos();
    this.listarDentistas();
    this.listarDatasRepasse();
    this.calcularValoresRepassados();
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
          //this.datasRepasse = repasses.map(getDataRepasse);
          // Usa a função abaixo para fazer o map
          this.datasRepasse = repasses.map(repasse => repasse.dataRepasse);
        }
      }
    )  
  }

  calcularValoresRepassados(): void {
    this.valoresRepassados = [
      [1200, 3405.34, 5213.1],
      [1200, 3405.34, 5213.1],
      [1200, 3405.34, 5213.1],
      [1200, 3405.34, 5213.1]
    ]
  }  

}

function getDataRepasse(repasse: Repasse) {
  return repasse.dataRepasse;
}
