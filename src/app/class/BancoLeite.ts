import { Categoria } from "./Categoria";

export interface IBancoLeite {
  id: number;
  classificacao: number;
  nome: string;
  descricao?: string;
  cep: string;
  logradouro: string;
  bairro: string;
  numero: string;
  complemento?: string;
  municipio: string;
  uf: string;
  longitude: string;
  latitude: string;
  dataUltimaAtualizacao: string;
  telefone?: string
  indValidado: boolean;
}

export class BancoLeite implements IBancoLeite {
  id: number;
  classificacao: number;
  nome: string;
  descricao?: string;
  telefone?: string
  cep: string;
  logradouro: string;
  bairro: string;
  numero: string;
  complemento?: string;
  municipio: string;
  uf: string;
  longitude: string;
  latitude: string;
  dataUltimaAtualizacao: string;
  categoria: Categoria | null = null;
  indValidado: boolean;

  constructor(dados: IBancoLeite) {
    this.id = dados.id;
    this.classificacao = dados.classificacao;
    this.nome = dados.nome;
    this.descricao = dados.descricao;
    this.telefone = dados.telefone;
    this.cep = dados.cep;
    this.logradouro = dados.logradouro;
    this.bairro = dados.bairro;
    this.numero = dados.numero;
    this.complemento = dados.complemento;
    this.municipio = dados.municipio;
    this.uf = dados.uf;
    this.longitude = dados.longitude;
    this.latitude = dados.latitude;
    this.dataUltimaAtualizacao = dados.dataUltimaAtualizacao;
    this.indValidado = dados.indValidado
  }

  static map(dados: IBancoLeite): BancoLeite {
    return new BancoLeite(dados);
  }
}
