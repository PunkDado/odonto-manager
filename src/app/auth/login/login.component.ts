import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/shared/models/login.model';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('formLogin') formLogin!: NgForm;
  login!: Login;
  loading: boolean = false;
  message!: string;
  //usuarioLogado!: Usuario;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) {
    
      if (this.loginService.usuarioLogado) {
      this.router.navigate(["login"]);
    
    }
  }

  ngOnInit(): void {

    this.login = new Login();

    this.route.queryParams.subscribe(
      params => {
        this.message = params['error'];
      }
    );
  }

  logar(): void {
    this.loading = true;
    if (this.formLogin.form.valid) {
      this.loginService.login(this.login).subscribe(
        (usu) => {
          this.loginService.usuarioLogado = usu;
          this.loading = false;
          this.router.navigate(["home"]);
        }
      )
      
    }
  }

  
  get usuarioLogado(): Usuario {
    return this.loginService.usuarioLogado;
  }
  

}
