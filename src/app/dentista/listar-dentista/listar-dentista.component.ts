import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dentista } from 'src/app/shared/models/dentista.model';
import { DentistaService } from '../services/dentista.service';

@Component({
  selector: 'app-listar-dentista',
  templateUrl: './listar-dentista.component.html',
  styleUrls: ['./listar-dentista.component.css']
})
export class ListarDentistaComponent implements OnInit {

  dentistas: Dentista[] = [];
  searchTerm!: string;
  dentistasFiltrados!: Dentista[];

  constructor(private dentistaService: DentistaService,
              private router: Router,
              private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.listarDentistas();
  }

  listarDentistas(): void {
    
    this.dentistaService.listarTodos().subscribe((dados) => {
      if (dados == null) {
        this.dentistas = [];
        //this.size = this.pedidos.length;
      }
      else {
        this.dentistas = dados;
        //this.size = this.pedidos.length;
      }
    });
  
  }

  remover($event: any, dentista: Dentista): void {
    $event.preventDefault();
    if (confirm('Deseja realmente remover o dentista "' + dentista.nomeDentista + ' ' + dentista.sobrenomeDentista + '"?')) {
      this.dentistaService.remover(dentista.id!).subscribe(
        () => this.listarDentistas()
      );
    }
  }

  filtrarDentistas(searchTerm: string): void {
    this.dentistasFiltrados = this.dentistas.filter(
      data => 
        data.nomeDentista?.toUpperCase().includes(searchTerm.toUpperCase())
        || data.sobrenomeDentista?.toUpperCase().includes(searchTerm.toUpperCase())
        || data.numCro?.toUpperCase().includes(searchTerm.toUpperCase())
    );
    this.dentistas = this.dentistasFiltrados;
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

