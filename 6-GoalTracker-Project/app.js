var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path')
var mongojs = require('mongojs');
var db = mongojs('mongodb+srv://driven:bg2eivOwfqrv9cQa@goaltracker-8v2p7.gcp.mongodb.net/test', ['goaltrackercl']);
var cors = require('cors');

app.use(bodyParser.json());

app.use(cors());

/* Isso nos habilita usar uma pasta chamada 'client'
para arquivos estáticos do lado do cliente */
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', function (req, res) {
  res.send('Funcionou!')
});

app.get('/goals', function (req, res) {
  db.goaltrackercl.find(function (err, docs) {
    if (err) {
      res.send(err);
    } else {
      console.log('Obtendo os objetivos...');
      res.json(docs);
    }
  });
});

app.post('/goals', function (req, res) {
  db.goaltrackercl.insert(req.body, function (err, docs) {
    if (err) {
      res.send(err);
    } else {
      console.log('Adicionando um objetivo...');
      res.json(docs);
    }
  });
});

app.put('/goals/:id', function (req, res) {
  db.goaltrackercl.findAndModify({
    query: { _id: mongojs.ObjectId(req.params.id) },
    update: {
      $set: {
        name: req.body.name,
        type: req.body.type,
        deadline: req.body.deadline
      }
    },
    new: true
  }, function (err, doc) {
    if (err) {
      res.send(err);
    } else {
      console.log('Atualizado o objetivo...');
      res.json(doc);
    }
  });
});

app.delete('/goals/:id', function (req, res) {
  db.goaltrackercl.remove({
    _id: mongojs.ObjectId(req.params.id)
  }, function (err, doc) {
    if (err) {
      res.send(err);
    } else {
      console.log('Removendo objetivo...');
      res.json(doc);
    }
  });
});

app.listen(3000);

console.log('Rodando na porta 3000');
