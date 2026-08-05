import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { BancoLeite } from '../../class/BancoLeite';
import { AutenticacaoService } from '../Autenticacao/autenticacao-service';

@Injectable({
  providedIn: 'root'
})
export class BancoLeiteService {
  constructor(
    private http: HttpClient,
    private autenticacaoService: AutenticacaoService
  ) { }

  cadastrarBancoLeite(dados: any) {
    const aux = localStorage.getItem('usuario');

    if (aux != null) {
      const user = JSON.parse(aux);

      const params = new HttpParams()
      .set('nomeUsuario', user.nome)
      .set('emailUsuario', user.email);

    const payloadParaSalvar = {
      ...dados,
      idClassificacao: dados.classificacao || dados.idClassificacao
    };

    delete payloadParaSalvar.classificacao;

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.accessToken}`
      });

      return this.http.post(`${environment.apiUrl}/banco-leite`,
        payloadParaSalvar,
      { headers, params });
    }

    return throwError(() => new Error('Usuário não autenticado.'));
  }

  solicitarEstacao(dados: any){
    return this.http.post(`${environment.apiUrl}/solicitar-banco-leite`, dados)
  }

  listBancoLeite(params?: any) {
  return this.http.get<BancoLeite[]>(`${environment.apiUrl}/banco-leite`, {
    params,
    observe: 'response'
  });
}

  buscarBancoLeite(idBanco: number) {
    const aux = localStorage.getItem('usuario');

    if (aux != null) {
      const user = JSON.parse(aux);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.accessToken}`
      });

      return this.http.get<BancoLeite>(`${environment.apiUrl}/banco-leite/${idBanco}`, { headers })
    }
    return throwError(() => new Error('Usuário não autenticado.'));
  }

  atualizarBancoLeite(dados: any) {
    const aux = localStorage.getItem('usuario');

    if (aux) {
      const user = JSON.parse(aux);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.accessToken}`
      });

      const params = new HttpParams()
        .set('nomeUsuario', user.nome)
        .set('emailUsuario', user.email);

      const payloadParaSalvar = {
        ...dados,
        idClassificacao: dados.classificacao || dados.idClassificacao
      };

      delete payloadParaSalvar.classificacao;

      return this.http.put<BancoLeite>(
        `${environment.apiUrl}/banco-leite/${dados.id}`,
        payloadParaSalvar,
        { headers, params }
      );
    }

    return throwError(() => new Error('Usuário não autenticado.'));
  }

  deletarSolicitacao(idSolicitacao: number){
    const headers = this.autenticacaoService.autenticacaoAPI()
    return this.http.delete(`${environment.apiUrl}/banco-leite/${idSolicitacao}`, { headers })
  }

  validarSolicitacao(idSolicitacao: number){
    const headers = this.autenticacaoService.autenticacaoAPI();
    return this.http.put(`${environment.apiUrl}/solicitar-banco-leite/${idSolicitacao}`, null , { headers })
  }

  cadastrarReporte(dados: any){
    return this.http.post(`${environment.apiUrl}/reporte`, dados)
  }

  finalizarReporte(id: number){
    const headers = this.autenticacaoService.autenticacaoAPI();
    return this.http.delete(`${environment.apiUrl}/reporte/${id}`, { headers });
  }
}
