var menu = require('node-menu');
var elasticsearch = require('elasticsearch');



var client = new elasticsearch.Client({
  host: 'https://LOGIN DO ELASTIC:SENHA DO LASTIC@ENDERECO DO CLUSTER',
  log: 'trace'
});

menu.addItem(
  'Excluir Índice',
  excluirIndice
);

menu.addItem(
  'Executar Bulk',
  executarBulk
);

menu.addItem(
  'Buscar',
  buscar
);

menu.start();

function excluirIndice() {
  client.indices.delete({
    index: 'beneficiarioscnu'
  }, function (err, resp, status) {
    console.log(status);
  });
}

function executarBulk() {
  client.bulk({
    body: [
      { index: { _index: 'beneficiarioscnu', _type: 'beneficiariocnu', _id: 1 } },
      {
        "NumeroCarteira": "0801234888888292",
        "Nome": "Maria Bittencourt",
        "NumeroCNS": "93457489",
        "DataNascimento": "1960-01-16T15:57:04.279Z",
        "SexoDescricao": "Feminino",
        "ValidadeCarteira": "2018-01-16T15:57:04.279Z",
        "DataExclusao": "2018-01-16T15:57:04.279Z",
        "Cpf": "111.111.111-44",
        "TipoDePlano": "B",
        "Contrato": "1234"
      },
      { index: { _index: 'beneficiarioscnu', _type: 'beneficiariocnu', _id: 2 } },
      {
        "NumeroCarteira": "234324324325",
        "Nome": "Joao Carlos Silva",
        "NumeroCNS": "3489-85-0",
        "DataNascimento": "2018-01-16T15:57:04.279Z",
        "SexoDescricao": "Masculino",
        "ValidadeCarteira": "2018-01-16T15:57:04.279Z",
        "Cpf": "02857103858",
        "TipoDePlano": "A",
        "Contrato": "4345"
      },
      { index: { _index: 'beneficiarioscnu', _type: 'beneficiariocnu', _id: 3 } },
      {
        "NumeroCarteira": "234324324325",
        "Nome": "Rafael Brandão",
        "NumeroCNS": "098088008",
        "DataNascimento": "1980-01-16T15:57:04.279Z",
        "SexoDescricao": "Masculino",
        "ValidadeCarteira": "2018-01-16T15:57:04.279Z",
        "Cpf": "214343403030",
        "TipoDePlano": "A",
        "Contrato": "1135"
      }
    ]
  }, function (err, resp, status) {
    console.log(status);
  });
}

function buscar() {
  client.search({
    index: 'beneficiarioscnu',
    type: 'beneficiariocnu',
    body: {
      query: {
        match_all: {

        }
      }
    }
  }).then(function (resp) {
    var hits = resp.hits.hits;
    console.log(hits);
  }, function (err) {
    console.trace(err.message);
  });
}
