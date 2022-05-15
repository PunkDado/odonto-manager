import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Convenio } from 'src/app/shared/models/convenio.model';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  BASE_URL = "http://localhost:8080/";
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Convenio[]> {
    return this.httpClient.get<Convenio[]>(this.BASE_URL + "convenios/", this.httpOptions);
  }

}
