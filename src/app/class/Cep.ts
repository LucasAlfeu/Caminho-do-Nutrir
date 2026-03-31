export class Cep{

  cep:string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string

    constructor(
        cep:string = '',
        logradouro: string = '',
        complemento: string = '',
        unidade: string = '',
        bairro: string = '',
        localidade: string = '',
        uf: string = '',
        estado: string = '',
        regiao: string = '',
        ibge: string = '',
        gia: string = '',
        ddd: string = '',
        siafi: string = '',
    ){
        this.cep = cep;
        this.uf = uf
        this.bairro = bairro;
        this.localidade = localidade
        this.logradouro = logradouro
        this.complemento = complemento;
        this.unidade = unidade;
        this.uf = uf;
        this.estado = estado;
        this.regiao = regiao;
        this.ibge = ibge;
        this.gia = gia;
        this.ddd = ddd;
        this.siafi = siafi;
    }
}