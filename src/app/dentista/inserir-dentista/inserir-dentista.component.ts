import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { DentistaService } from '../services/dentista.service';

@Component({
  selector: 'app-inserir-dentista',
  templateUrl: './inserir-dentista.component.html',
  styleUrls: ['./inserir-dentista.component.css']
})
export class InserirDentistaComponent implements OnInit {

  @ViewChild('formDentista') formDentista! : NgForm;
  dentista!: Dentista;

  constructor(
    private dentistaService: DentistaService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.dentista = new Dentista();
  }

  inserir(): void {
    if(this.formDentista.form.valid) {
      this.dentistaService.inserir(this.dentista).subscribe(
        () => this.router.navigate(["dentistas/"])
      );
    }
    
  }

}
