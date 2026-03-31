import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../../class/Estado';
import { Municipio } from '../../class/Municipio';
import { Cep } from '../../class/Cep';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  constructor(private http: HttpClient) { }

  buscarEstados(): Observable<Estado[]>{
    return this.http.get<Estado[]>('http://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
  }

  buscarMunicipios(uf: string): Observable<Municipio[]>{
    return this.http.get<Municipio[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
  }

  buscaDadosCep(cep: string){
    return this.http.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`)
  }
}

