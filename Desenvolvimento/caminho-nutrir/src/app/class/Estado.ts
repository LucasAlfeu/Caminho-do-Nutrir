export interface Regiao {
  id: number;
  sigla: string;
  nome: string;
}


export class Estado {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao;

  constructor(
    id: number = 0, 
    sigla: string = '', 
    nome: string = '', 
    regiao: any = null
  ) {
    this.id = id;
    this.sigla = sigla;
    this.nome = nome;
    this.regiao = regiao;
  }
}

