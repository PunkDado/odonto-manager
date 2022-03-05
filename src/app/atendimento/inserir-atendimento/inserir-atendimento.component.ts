import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DentistaService } from 'src/app/dentista/services/dentista.service';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { ProcedimentoAplicado } from 'src/app/shared/models/procedimento-aplicado.model';
import { AtendimentoService } from '../services/atendimento.service';
//import { ProcedimentoAplicadoService } from 'src/app/procedimento-aplicado/services/procedimento-aplicado.service';

@Component({
  selector: 'app-inserir-atendimento',
  templateUrl: './inserir-atendimento.component.html',
  styleUrls: ['./inserir-atendimento.component.css']
})
export class InserirAtendimentoComponent implements OnInit {

  @ViewChild('formAtendimento') formAtendimento!: NgForm;

  atendimento!: Atendimento;
  //dentistas!: Dentista[];

  constructor(
    private atendimentoService: AtendimentoService,
    private dentistaService: DentistaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.atendimento = new Atendimento();
    
    /*
    this.dentistas = this.dentistaService.listarTodos().subscribe(
      (dados: Dentista[]) => {
        if (dados == null) {
          this.dentistas = [];
        }
        else {
          this.dentistas = dados;
        }
      }
    );*/
  }

  inserir(): void {
    if(this.formAtendimento.form.valid) {
      this.atendimentoService.inserir(this.atendimento);
      this.router.navigate(['/atendimentos']);
    }
  }

  inserirProcedimentoAplicado(): void {
    this.atendimento.procedimentosAplicados!.push(new ProcedimentoAplicado());
    
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
