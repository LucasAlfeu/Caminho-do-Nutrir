import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../../class/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(
    private http: HttpClient
  ) { }

  listarUsuarios() {
    const aux = localStorage.getItem('usuario');

    if (aux != null) {
      const user = JSON.parse(aux);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.accessToken}`
      });

      return this.http.get<Usuario[]>(`${environment.apiUrl}/usuario`, { headers })
    }
    return throwError(() => new Error('Usuário não autenticado.'));
  }
}
