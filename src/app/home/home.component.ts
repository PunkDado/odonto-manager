import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/services/login.service';
import { Usuario } from '../shared/models/usuario.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  get usuarioLogado(): Usuario {
    if (this.loginService.usuarioLogado == null) {
      return {}
    }
    else {
      return this.loginService.usuarioLogado;
    }
  }

}
