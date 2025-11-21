import { Estado } from "./Estado";

export interface Microrregiao{
    id: number;
    nome: string;
    mesorregiao: Mesorregiao;
}

export interface Mesorregiao{
    id: number;
    nome: string;
    estado: Estado;
}

export interface RegiaoImediata{
    id: number;
    nome: string;
    regiaoIntermediaria: RegiaoIntermediaria
}

export interface RegiaoIntermediaria{
    id: number;
    nome: string;
    estado: Estado;
}


export class Municipio{
    id: number;
    nome: string;
    microrregiao: Microrregiao;
    mesorregiao: Mesorregiao;
    regiaoImediata: RegiaoImediata;
    regiaoIntermediaria: RegiaoIntermediaria;

    constructor(
        id: number = 0,
        nome: string = '',
        microrregiao: any = null,
        mesorregiao: any = null,
        regiaoImediata: any = null,
        regiaoIntermediaria: any = null,
    ){
        this.id = id;
        this.nome = nome;
        this.microrregiao = microrregiao;
        this.mesorregiao = mesorregiao;
        this.regiaoImediata = regiaoImediata;
        this.regiaoIntermediaria = regiaoIntermediaria;
    }
}