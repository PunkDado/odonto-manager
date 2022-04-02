import { Injectable } from '@angular/core';
import { Atendimento } from 'src/app/shared/models/atendimento.model';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  downloadFile(data: Atendimento[], filename='data') {
    let csvData = this.ConvertToCSV(data, ['paciente','dataAtendimento', 'convenio', 'numGto', 'dataEnvio', 'dentista']);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray: Atendimento[], headerList: string[]) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    let procedimentoAplicadoHeaderList = ['procedimento', 'dataRepasse', 'valor', 'valorLiquido', 'valorRepassado'];
    for (let index in headerList) {
      row += headerList[index] + ',';
        }

    for (let index in procedimentoAplicadoHeaderList) {
      row += procedimentoAplicadoHeaderList[index] + ',';
        }

    row = row.slice(0, -1); //Drops last comma
    str += row + '\r\n';
    let lineCount: number = 0;
    for (let i = 0; i < array.length; i++) {

      //Loop over array[i].procedimentosAplicados
      for (let j = 0; j < array[i].procedimentosAplicados.length; j++) {
        
        //let line = (i+1)+'';
        lineCount += 1;
        let line = lineCount.toString();
        for (let index in headerList) {
          let head = headerList[index];
          if (head == 'dentista') {
            line += ',' + array[i][head].nomeDentista + ' ' + array[i][head].sobrenomeDentista;
          } 
          else {
            line += ',' + array[i][head];
          }
        }
        
        for (let index in procedimentoAplicadoHeaderList) {
          let head = procedimentoAplicadoHeaderList[index];
          line += ',' + array[i].procedimentosAplicados[j][head];
          
        }

        str += line + '\r\n';
      }
    }
    return str;
  }

}
