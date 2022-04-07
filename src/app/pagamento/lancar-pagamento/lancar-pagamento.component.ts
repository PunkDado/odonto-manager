import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AtendimentoService } from 'src/app/atendimento/services/atendimento.service';
import { DentistaService } from 'src/app/dentista/services/dentista.service';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { Convenio } from 'src/app/shared/models/convenio.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { ProcedimentoAplicado } from 'src/app/shared/models/procedimento-aplicado.model';
import { Repasse } from 'src/app/shared/models/repasse.model';
import { DownloadService } from '../services/download.service';
import { RepasseService } from '../services/repasse.service';

@Component({
  selector: 'app-lancar-pagamento',
  templateUrl: './lancar-pagamento.component.html',
  styleUrls: ['./lancar-pagamento.component.css']
})
export class LancarPagamentoComponent implements OnInit {

  @ViewChild('formDentistaDataRepasse') formDentistaDataRepasse!: NgForm;

  dentistas: Dentista[] = [];
  dentistaId!: number;
  dataRepasse!: string;
  dentista!: Dentista;
  atendimentos!: Atendimento[];
  datasRepasse!: string[];
  convenios!: Convenio[];
  convenio!: string;
  
  constructor(
    private atendimentoService: AtendimentoService,
    private dentistaService: DentistaService,
    private repasseService: RepasseService,
    private downloadService: DownloadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarAtendimentos();
    this.listarDentistas();
    this.listarDatasRepasse();
    this.listarConvenios();
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

  listarConvenios(): void {
    this.convenios = [];
    let listaConvenios = [
      'Particular',
      'Amil',
      'Rede Unna',
      'Dental Uni',
      'Sul América',
      'Metlife'
    ];
    for (let i = 0; i < listaConvenios.length; i++) {
      let convenio = new Convenio();
      convenio.id = i;
      convenio.nomeConvenio = listaConvenios[i];
      this.convenios.push(convenio);
    }
    
  }

  listarAtendimentosPorConvenio(convenio: string): Atendimento[] {
    let atendimentosFiltrados: Atendimento[];
    //console.log("convenio=", convenio);
    //console.log("atendimentos", this.atendimentos);
    
    if ((convenio == null || convenio == '')) {
      atendimentosFiltrados = this.atendimentos.sort(
        function(a, b) {
          if (a.dataAtendimento! > b.dataAtendimento!) {
            return 1;
          }
          if (a.dataAtendimento! < b.dataAtendimento!) {
            return -1;
          }
          return 0;
        }
      );

      // Inclui somente os procedimentos aplicados com dataRepasse == null ou ""
      atendimentosFiltrados.forEach(
        atendimento => {
          let procedimentosAplicadosFiltrados: ProcedimentoAplicado[] = [];
          atendimento.procedimentosAplicados.forEach(
            (procedimentoAplicado, index, array) => {
              if (procedimentoAplicado.dataRepasse == null || procedimentoAplicado.dataRepasse == "") {
                procedimentosAplicadosFiltrados.push(procedimentoAplicado);
              }
            }
          );
          atendimento.procedimentosAplicados = procedimentosAplicadosFiltrados;
        } 
      );
      //console.log(this.atendimentos);
      return atendimentosFiltrados;
    }
    else {
      atendimentosFiltrados = this.atendimentos.sort(
        function(a, b) {
          if (a.dataAtendimento! > b.dataAtendimento!) {
            return 1;
          }
          if (a.dataAtendimento! < b.dataAtendimento!) {
            return -1;
          }
          return 0;
        }
      )
        .filter(atendimento => atendimento.convenio == convenio);
      
      // Inclui somente os procedimentos aplicados com dataRepasse == null ou ""
      atendimentosFiltrados.forEach(
        atendimento => {
          let procedimentosAplicadosFiltrados: ProcedimentoAplicado[] = [];
          atendimento.procedimentosAplicados.forEach(
            (procedimentoAplicado, index, array) => {
              if (procedimentoAplicado.dataRepasse == null || procedimentoAplicado.dataRepasse == "") {
                procedimentosAplicadosFiltrados.push(procedimentoAplicado);
              }
            }
          );
          atendimento.procedimentosAplicados = procedimentosAplicadosFiltrados;
        } 
      );
      return atendimentosFiltrados;
    }
  }
  reiniciar(): void {
    this.dataRepasse = "";
    this.dentistaId = 0;
  }

  setDentistaDataRepasse(dentista: Dentista, dataRepasse: string): void {
    this.dataRepasse = dataRepasse;
    this.dentistaId = dentista.id!;
  }

  downloadReport(): void {
    let atendimentosToDownload: Atendimento[] = 
      this.listarAtendimentosPorConvenio(this.convenio);
    let filename: string = getFilename(this.dentistaId) + "_" + this.dataRepasse;
    this.downloadService.downloadFile(atendimentosToDownload, filename);
  }

  downloadAllReports(): void {

    /*let dentistaIds = this.dentistas.map(
      dentista => dentista.id!
    );
    
    if (confirm('Deseja fazer o download de todos os relatórios, por dentista, \
      para a data selecionada?\nSe não selecionar nenhuma data, fará o download \
      de todas as datas de repasse, também separados por dentista.')) {
      
      for (let id of dentistaIds) {
        
        let atendimentosToDownload: Atendimento[] = 
          this.listarAtendimentosPorConvenio(id);
        let filename: string;
        if (this.dataRepasse == undefined) {
          filename = getFilename(id) + "_todas_as_datas";
        }
        else {
          filename = getFilename(id) + "_" + this.dataRepasse;
        }
        this.downloadService.downloadFile(atendimentosToDownload, filename);
      }
      
    }*/

  }

  novaDataRepasse(): void {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let date = yyyy + "-" + mm + "-" + dd;

    if (confirm('Deseja definir a data de ' + dd + '/' + mm + '/' + yyyy + ' como data de repasse?')) {
      if (this.datasRepasse.indexOf(date) == -1) {
        let repasse = new Repasse();
        repasse.dataRepasse = date;
        this.repasseService.inserir(repasse).subscribe(
          () => this.router.navigate(['/pagamentos'])
        );
        this.setDataRepasse(date);
        this.router.navigate(['/pagamentos/lancar']);
      }
      else {
        this.setDataRepasse(date);
        this.router.navigate(['/pagamentos/lancar']);
      }
    }
    
  }

  setDataRepasse(dataRepasse: string): void {
    
    for (let atendimento of this.atendimentos) {
      for (let procedimentoAplicado of atendimento.procedimentosAplicados) {
        if (procedimentoAplicado.recebido == true && procedimentoAplicado.repassado == false) {
          procedimentoAplicado.dataRepasse = dataRepasse;
          procedimentoAplicado.repassado = true;
        }
      }
    //Persistir o atendimento no banco, chamar método POST /atendimentos/atendimento.id body = {atendimento}
    this.atendimentoService.atualizar(atendimento).subscribe(
      () => {console.log(atendimento)}
    );
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
