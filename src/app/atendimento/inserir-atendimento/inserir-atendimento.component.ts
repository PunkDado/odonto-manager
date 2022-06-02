import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DentistaService } from 'src/app/dentista/services/dentista.service';
import { PacienteService } from 'src/app/paciente/services/paciente.service';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { Paciente } from 'src/app/shared/models/paciente.model';
import { ProcedimentoAplicado } from '../../shared/models/procedimento-aplicado.model';
import { AtendimentoService } from '../services/atendimento.service';

@Component({
  selector: 'app-inserir-atendimento',
  templateUrl: './inserir-atendimento.component.html',
  styleUrls: ['./inserir-atendimento.component.css']
})
export class InserirAtendimentoComponent implements OnInit {

  @ViewChild('formAtendimento') formAtendimento!: NgForm;

  atendimento!: Atendimento;
  dentistas!: Dentista[];
  pacientes!: Paciente[];

  constructor(
    private atendimentoService: AtendimentoService,
    private dentistaService: DentistaService,
    private pacienteService: PacienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.atendimento = new Atendimento();
    this.atendimento.paciente = "";
    this.dentistaService.listarTodos().subscribe(
      (dados: Dentista[]) => {
        if(dados == null) {
          this.dentistas = [];
        }
        else {
          this.dentistas = dados;
        }
      }
    );
    this.pacienteService.listarTodos().subscribe(
      (dados: Paciente[]) => {
        if(dados == null) {
          this.pacientes = [];
        }
        else {
          this.pacientes = dados;
        }
      }
    );
  }

  inserir(): void {
    if (this.formAtendimento.form.valid) {
      this.atendimentoService.inserir(this.atendimento).subscribe(
        () => this.router.navigate(['/atendimentos'])
      );
      
    }
  }

  inserirProcedimentoAplicado(): void {
    this.atendimento.procedimentosAplicados!.push(new ProcedimentoAplicado());
  }

  removerProcedimentoAplicado(i: number): void {
    this.atendimento.procedimentosAplicados!.splice(i, 1);
  }

}


/*
export class InserirPedidoComponent implements OnInit {

  @ViewChild('formPedido') formPedido! : NgForm;

  pedido!: Pedido;
  clientes!: Cliente[];
  produtos!: Produto[];

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private router: Router) { }

  ngOnInit(): void {
    this.pedido = new Pedido();
    this.clienteService.listarTodos().subscribe((dados: Cliente[]) => {
      if (dados == null) {
        this.clientes = [];
      }
      else {
        this.clientes = dados;
      }
    });
    this.produtoService.listarTodos().subscribe(
      (dados: Produto[]) =>{
        if(dados == null) {
          this.produtos = [];
        }
        else {
          this.produtos = dados;
        }
    } );
  }

  inserir(): void {
    if (this.formPedido.form.valid) {
      this.pedidoService.inserirNovoPedido(this.pedido).subscribe(
        () => this.router.navigate( ["/pedidos"] )
      );
    }
  }

  inserirItemDoPedido(): void {
    this.pedido.itensDoPedido.push(new ItemDoPedido());
  }

}
*/
