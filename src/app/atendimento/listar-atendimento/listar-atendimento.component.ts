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

/*
export class ListarPedidoComponent implements OnInit {

  clientes: Cliente[] = [];
  pedidos: Pedido[] = [];
  pageSize: number = 10;
  page: number = 1;
  size: number = 10;
  cpf!: string;
  id!: string;

  constructor(private pedidoService: PedidoService,
              private clienteService: ClienteService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.pedidos = this.listarTodosOsPedidos();
    this.listarTodosOsPedidos();
    this.listarClientes();
  }

    listarTodosOsPedidos(): void {

      this.pedidoService.listarTodosOsPedidos().subscribe((dados) => {
        if (dados == null) {
          this.pedidos = [];
          this.size = this.pedidos.length;
        }
        else {
          this.pedidos = dados;
          this.size = this.pedidos.length;
        }
      });
  
  
      // Esta tentativa de manter a estrutura do banco relacional não está funcionando
      for(let i=0; i<this.pedidos.length; i++) {
        let itens: ItemDoPedido[] = [];
        this.pedidoService.listarItensDoPedidoPorPedido(this.pedidos[i]).subscribe(
          (dados) => {
            if (dados !== null) {
              itens = dados
            }
          }
        );
        this.pedidos[i].itensDoPedido = itens;
      }
    }
  
    buscarPorCpf(): void {
      this.id = this.transformaCpfParaId(this.cpf);
      this.router.navigate(["/pedidos/cliente/" + this.id ]);
  
    }
  
    transformaCpfParaId(cpf: string): string {
      let idCliente: string = '';
      for(let i=0; i<this.clientes.length; i++){
        if (this.clientes[i].cpf == cpf){
          idCliente = this.clientes[i].id!.toString() ;
        }
      }
      return idCliente;
    }
  
    listarClientes(): void {
      this.clienteService.listarTodos().subscribe(
        (dados: Cliente[]) => {
          if (dados == null){
            this.clientes = []
          }
          else {
            this.clientes = dados;
          }
        });
    }
  
  }
  
  export class NgbdAccordionBasic {
  
  }
*/
