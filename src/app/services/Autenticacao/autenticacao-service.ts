import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../class/Usuario';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private http: HttpClient) { }

  entrar(dados: any) {
    return this.http.post<Usuario>(`${environment.apiUrl}/entrar`, dados);
  }
}

