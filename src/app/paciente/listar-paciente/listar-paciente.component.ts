import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from 'src/app/shared/models/paciente.model';
import { ModalPacienteComponent } from '../modal-paciente/modal-paciente.component';
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
    private pacienteService: PacienteService,
    private modalService: NgbModal
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

  remover($event: any, paciente: Paciente): void {
    $event.preventDefault();
    if (confirm('Deseja realmente remover o paciente "' + paciente.nomePaciente + ' ' + paciente.sobrenomePaciente + '"?')) {
      this.pacienteService.remover(paciente.id!).subscribe(
        () => this.listarTodos()
      );
    }
  }

  abrirModalPaciente(paciente: Paciente) {
    const modalRef = this.modalService.open(ModalPacienteComponent);
    modalRef.componentInstance.paciente = paciente;
  }

}
