import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

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

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.accessToken}`
      });

      return this.http.post(`${environment.apiUrl}/banco-leite`, dados, { headers });
    }

    return throwError(() => new Error('Usuário não autenticado.'));
  }
}
