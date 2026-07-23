import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { BancoLeite } from '../../class/BancoLeite';

@Injectable({
  providedIn: 'root'
})
export class BancoLeiteService {
  constructor(
    private http: HttpClient
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

  listBancoLeite() {
    return this.http.get<BancoLeite[]>(`${environment.apiUrl}/banco-leite`, {
      observe: 'response'
    })
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
}
