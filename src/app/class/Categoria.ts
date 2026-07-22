export class Categoria {
  id: number
  nome: string
  descricao: string
  cor: string

  constructor(id: number, nome: string, descricao: string, cor: string){
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.cor = cor
  }
}
