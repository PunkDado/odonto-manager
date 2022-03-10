import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { DentistaService } from '../services/dentista.service';

@Component({
  selector: 'app-editar-dentista',
  templateUrl: './editar-dentista.component.html',
  styleUrls: ['./editar-dentista.component.css']
})
export class EditarDentistaComponent implements OnInit {

  @ViewChild('formDentista') formDentista!: NgForm;
  dentista: Dentista = {};

  constructor(
    private dentistaService: DentistaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.dentistaService.buscarPorId(id).subscribe(
      (dados: Dentista) => {
        this.dentista = dados;
      }
    );
  }

  atualizar(): void {
    if(this.formDentista.form.valid) {
      this.dentistaService.alterar(this.dentista).subscribe(
        () => this.router.navigate(["dentistas/"])
      );
    }
  }



}
