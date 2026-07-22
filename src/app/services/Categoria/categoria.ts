import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria } from '../../class/Categoria';
import { environment } from '../../environments/environment';

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
}
