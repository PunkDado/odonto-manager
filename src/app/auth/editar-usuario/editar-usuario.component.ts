import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  @ViewChild('formUsuario') formUsuario!: NgForm;
  usuario!: Usuario;
  perfis: string[] = ["ADMIN", "GERENTE", "DENTISTA", "FUNC"];
  confirmaSenha!: string | undefined;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.usuarioService.buscarPorId(id).subscribe(
      (dados: Usuario) => {
        this.usuario = dados;
      }
    );
    this.confirmaSenha = this.usuario.senha;
  }

  atualizar(): void {
    if(this.formUsuario.form.valid) {
      if (this.usuario.senha == this.confirmaSenha) {
        this.usuarioService.alterar(this.usuario).subscribe(
          () => this.router.navigate(["usuarios/"])
        );
      }
      else {
        confirm('As senhas são diferentes');
      }
    }
  }

}
