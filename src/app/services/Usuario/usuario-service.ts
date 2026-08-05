import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../../class/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(
    private http: HttpClient
  ) { }

  listarUsuarios(params?: any): Observable<HttpResponse<Usuario[]>> {
    const aux = localStorage.getItem('usuario');

    if (aux != null) {
      const user = JSON.parse(aux);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.accessToken}`
      });

      return this.http.get<Usuario[]>(`${environment.apiUrl}/usuario` ,{
        params,
        observe: 'response',
        headers: headers
      });
    }

    return throwError(() => new Error('Usuário não autenticado.'));
  }

  habilitarUsuario(idUsuario: number) {
  const aux = localStorage.getItem('usuario');

  if (aux != null) {
    const user = JSON.parse(aux);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${user.accessToken}`
    });

    return this.http.put<Usuario>(
      `${environment.apiUrl}/usuario/${idUsuario}/habilitar`,
      {},
      {
        observe: 'response',
        headers: headers
      }
    );
  }

  return throwError(() => new Error('Usuário não autenticado.'));
}

  tornarAdm(idUsuario: number){
    const aux = localStorage.getItem('usuario');

    if (aux != null) {
      const user = JSON.parse(aux);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.accessToken}`
      });

      return this.http.put<Usuario>(`${environment.apiUrl}/usuario/${idUsuario}/tornar-administrador`,
      {},
      {
        observe: 'response',
        headers: headers
      });
    }

    return throwError(() => new Error('Usuário não autenticado.'));
  }

  desabilitarUsuario(idUsuario: number){
    const aux = localStorage.getItem('usuario');

    if (aux != null) {
      const user = JSON.parse(aux);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.accessToken}`
      });

      return this.http.put<Usuario>(`${environment.apiUrl}/usuario/${idUsuario}/desabilitar`,
      {},
      {
        observe: 'response',
        headers: headers
      });
    }

    return throwError(() => new Error('Usuário não autenticado.'));
  }

  deletarUsuario(idUsuario: number){
    const aux = localStorage.getItem('usuario');

    if (aux != null) {
      const user = JSON.parse(aux);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.accessToken}`
      });

      return this.http.put<Usuario>(`${environment.apiUrl}/usuario/${idUsuario}`,
      {},
      {
        observe: 'response',
        headers: headers
      });
    }

    return throwError(() => new Error('Usuário não autenticado.'));
  }

  atualizarUsuario(dados: any){
    const aux = localStorage.getItem('usuario');

    if (aux != null) {
      const user = JSON.parse(aux);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.accessToken}`
      });

      return this.http.put<Usuario>(`${environment.apiUrl}/usuario/${user.id}`,
      dados,
      {
        observe: 'response',
        headers: headers
      });
    }

    return throwError(() => new Error('Usuário não autenticado.'));
  }
}
