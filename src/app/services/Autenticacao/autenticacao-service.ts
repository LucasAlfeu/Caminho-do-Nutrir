import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../class/Usuario';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AutenticacaoService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  entrar(dados: any) {
    return this.http.post<Usuario>(`${environment.apiUrl}/entrar`, dados);
  }

  cadastrarUsuario(dados: any){
    return this.http.post<Usuario>(`${environment.apiUrl}/cadastrar`, dados);
  }

  verificaLogin(): any {
    const usuarioLogado = localStorage.getItem("usuario");

    if (usuarioLogado !== null) {
      const user = JSON.parse(usuarioLogado);

      return user
    } else {
      this.toastr.error("Erro de autenticação");
      setTimeout(() => {
        this.router.navigate(['entrar']);
      }, 3000);
      return null;
    }
  }

  verificaAdministrador(): boolean{
    const usuarioLogado = localStorage.getItem("usuario");

    if (usuarioLogado !== null) {
      const user = JSON.parse(usuarioLogado);

      return user.indAdm ? true : false;
    } else {
      return false;
    }
  }

  // Retorna se tem usuário logado ou não
  validaUsuarioLogado(): boolean{
    const usuarioLogado = localStorage.getItem("usuario");

    if(usuarioLogado !== null){
      const user = JSON.parse(usuarioLogado);

      return user ? true : false
    } else {
      return false
    }
  }

  recuperaSenha(dados: any) {
    return this.http.put(`${environment.apiUrl}/recuperar-senha`, dados)
  }
}

