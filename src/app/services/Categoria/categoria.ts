import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria } from '../../class/Categoria';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient
  ) { }

  listarCategorias(){
    return this.http.get<Categoria[]>(`${environment.apiUrl}/classificacao`, {
      observe: 'response'
    })
  }

  cadastrarCategoria(dados: any){
    const aux = localStorage.getItem('usuario');

    if (aux != null) {
      const user = JSON.parse(aux);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${user.accessToken}`
      });
      return this.http.post<Categoria>(`${environment.apiUrl}/classificacao`, dados, { headers })
    }
    return throwError(() => new Error('Usuário não autenticado.'));
  }
}
