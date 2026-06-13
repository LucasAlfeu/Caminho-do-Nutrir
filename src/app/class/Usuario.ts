export class Usuario {
  id: number;
  nome: string;
  usuario: string;
  email: string;
  matricula: string;
  indAdm: boolean;
  indLiberado: boolean;

  constructor(
    id: number,
    nome: string,
    usuario: string,
    email: string,
    matricula: string,
    indAdm: boolean,
    indLiberado: boolean
  ) {
    this.id = id;
    this.nome = nome;
    this.usuario = usuario;
    this.email = email;
    this.matricula = matricula;
    this.indAdm = indAdm;
    this.indLiberado = indLiberado;
  }


  static map(dados: any): Usuario {
    if (!dados) return null as any;

    return new Usuario(
      dados.id,
      dados.nome,
      dados.usuario,
      dados.email,
      dados.matricula,
      dados.indAdm,
      dados.indLiberado
    );
  }
}
