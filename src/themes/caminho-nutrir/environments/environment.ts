export const environment = {
  production: false,
  apiUrl: 'https://api-caminho-nutrir.vercel.app/',
  tenant: 'caminho-nutrir',

  nome: 'Caminho do Nutrir',

  nomenclatura: {
    label:{
      nomeEstacao: 'Digite o nome do banco'
    },

    painel: {
      titulo: 'Bancos de Leite Humano',
      subtitulo: 'Gerenciamento e controle de bancos cadastrados no sistema',
      totalEstacao: 'Total de Bancos',
      btnAdicionarEstacao: 'Adicionar Banco',
    },

    cadastro: {
      titulo: 'Cadastrar Banco de Leite Humano',
      tituloEdicao: 'Atualizar Banco de Leite Humano',
    },

    filtro: {
      nomeEstacao: 'Buscar banco pelo nome',
    },

    cadastroUsuario: {
      text1: 'Juntos, vamos mapear pontos de doação e transformar vidas através da solidariedade.',
      text2: 'Preencha os campos ao lado para fazer parte dessa rede de apoio e nutrição.',
    }
  }
};
