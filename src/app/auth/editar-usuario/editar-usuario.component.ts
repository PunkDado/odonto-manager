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
  perfis: string[] = [];

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
    console.log(this.usuario);
  }

  atualizar(): void {
    if(this.formUsuario.form.valid) {
      this.usuarioService.alterar(this.usuario).subscribe(
        () => this.router.navigate(["usuarios/"])
      );
    }
  }

}
