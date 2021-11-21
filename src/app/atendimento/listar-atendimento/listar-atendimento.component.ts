import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { ModalAtendimentoComponent } from '../modal-atendimento/modal-atendimento.component';
import { AtendimentoService } from '../services/atendimento.service';

@Component({
  selector: 'app-listar-atendimento',
  templateUrl: './listar-atendimento.component.html',
  styleUrls: ['./listar-atendimento.component.css']
})
export class ListarAtendimentoComponent implements OnInit {

  atendimentos!: Atendimento[];

  constructor(private atendimentoService: AtendimentoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.atendimentos = this.listarTodos();
  }

  listarTodos(): Atendimento[] {
    return this.atendimentoService.listarTodos();
  }

  remover($event: any, atendimento: Atendimento): void {
    $event.preventDefault();
    if (confirm('Deseja remover o atendimento?')) {
      this.atendimentoService.remover(atendimento.id!);
      this.atendimentos = this.listarTodos();
    }
  }

  abrirModalAtendimento(atendimento: Atendimento) {
    const modalRef = this.modalService.open(ModalAtendimentoComponent);
    modalRef.componentInstance.atendimento = atendimento;
  }

}
