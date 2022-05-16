import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DentistaService } from 'src/app/dentista/services/dentista.service';
import { Atendimento } from 'src/app/shared/models/atendimento.model';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { ModalAtendimentoComponent } from '../modal-atendimento/modal-atendimento.component';
import { AtendimentoService } from '../services/atendimento.service';

@Component({
  selector: 'app-listar-atendimento',
  templateUrl: './listar-atendimento.component.html',
  styleUrls: ['./listar-atendimento.component.css']
})
export class ListarAtendimentoComponent implements OnInit {

  atendimentos: Atendimento[] = [];
  dentistas!: Dentista[];
  pageSize: number = 10;
  page: number = 1;
  size: number = 10;
  search: string = "";
  searchDate: string = "";
  atendimentosFiltrados: Atendimento[] = [];

  constructor(
    private atendimentoService: AtendimentoService, 
    private dentistaService: DentistaService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.listarTodos();
    this.listarDentistas();
  }

  listarTodos(): void {

    this.atendimentoService.listarTodos().subscribe((dados) => {
      if (dados == null) {
        this.atendimentos = [];
        this.size = this.atendimentos.length;
      }
      else {
        this.atendimentos = dados;
        this.size = this.atendimentos.length;
      }
    });

  }

  listarDentistas(): void {
    this.dentistaService.listarTodos().subscribe(
      (dados: Dentista[]) => {
        if (dados == null){
          this.dentistas = []
        }
        else {
          this.dentistas = dados;
        }
      });
  }

  
  /*remover($event: any, atendimento: Atendimento): void {
    $event.preventDefault();
    if (confirm('Deseja remover o atendimento?')) {
      this.atendimentoService.remover(atendimento.id!);
      this.listarTodos();
    }
  }*/

  remover($event: any, atendimento: Atendimento): void {
    $event.preventDefault();
    if (confirm('Deseja realmente remover o atendimento "' + atendimento.paciente + ' ' + atendimento.dataAtendimento + '"?')) {
      this.atendimentoService.remover(atendimento.id!).subscribe(
        () => this.listarTodos()
      );
    }
  }
  

  abrirModalAtendimento(atendimento: Atendimento) {
    const modalRef = this.modalService.open(ModalAtendimentoComponent);
    modalRef.componentInstance.atendimento = atendimento;
  }

  filtrarAtendimentos(searchTerm: string): void {
    this.atendimentosFiltrados = this.atendimentos.filter(
      data => 
        data.entPaciente?.nomePaciente?.toUpperCase().includes(searchTerm.toUpperCase())
        || data.entPaciente?.sobrenomePaciente?.toUpperCase().includes(searchTerm.toUpperCase())
        || data.dentista?.nomeDentista?.toUpperCase().includes(searchTerm.toUpperCase())
        || data.dentista?.sobrenomeDentista?.toUpperCase().includes(searchTerm.toUpperCase())
        || data.numGto?.includes(searchTerm)
        || data.convenio?.toUpperCase().includes(searchTerm.toUpperCase())
    );
    this.atendimentos = this.atendimentosFiltrados;
    // Inserir código para filtrar atendimentos segundo a string "search"
  }

  filtrarAtendimentosPorData(searchTerm: string): void {
    this.atendimentosFiltrados = this.atendimentos.filter(
      data => 
        data.dataAtendimento?.includes(searchTerm)
    );
    this.atendimentos = this.atendimentosFiltrados;
    // Inserir código para filtrar atendimentos segundo a string "search"
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
