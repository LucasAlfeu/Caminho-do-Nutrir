export class Usuario {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    email: string;
    matricula: string;
    indAdm: boolean;
    indLiberado: boolean;

    constructor(
    id: number,
    nome: string,
    usuario:string,
    senha:string,
    email:string,
    matricula:string,
    indAdm:boolean,
    indLiberado:boolean)
    {
        this.id = id;
        this.nome = nome;
        this.usuario = usuario;
        this.senha = senha;
        this.email = email;
        this.matricula = matricula;
        this.indAdm = indAdm;
        this.indLiberado = indLiberado;
    }
}
