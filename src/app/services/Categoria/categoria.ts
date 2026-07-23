import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria } from '../../class/Categoria';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { AutenticacaoService } from '../Autenticacao/autenticacao-service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient,
    private autenticacaoService: AutenticacaoService
  ) { }

  listarCategorias(){
    return this.http.get<Categoria[]>(`${environment.apiUrl}/classificacao`, {
      observe: 'response'
    })
  }

  cadastrarCategoria(dados: any){
    const headers = this.autenticacaoService.autenticacaoAPI()
    return this.http.post<Categoria>(`${environment.apiUrl}/classificacao`, dados, { headers })
  }

  atualizarCategoria(idCategoria: number, dados: any) {
    const headers = this.autenticacaoService.autenticacaoAPI()
    return this.http.put<Categoria>(`${environment.apiUrl}/classificacao/${idCategoria}`, dados, { headers })
  }
}
