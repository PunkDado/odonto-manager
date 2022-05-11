import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/shared/models/paciente.model';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-listar-paciente',
  templateUrl: './listar-paciente.component.html',
  styleUrls: ['./listar-paciente.component.css']
})
export class ListarPacienteComponent implements OnInit {

  pacientes!: Paciente[];
  pageSize: number = 10;
  page: number = 1;
  size: number = 10;

  constructor(
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(): void {
    
    this.pacienteService.listarTodos().subscribe((dados) => {
      if (dados == null) {
        this.pacientes = [];
        this.size = this.pacientes.length;
      }
      else {
        this.pacientes = dados;
        this.size = this.pacientes.length;
      }
    });

  }

}
