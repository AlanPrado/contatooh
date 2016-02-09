var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;

var _idContato = new ObjectID("56b7cb5adb8398ebe66ad431");

MongoClient.connect('mongodb://127.0.0.1:27017/contatooh', 
	function(erro, db) {
		if(erro) throw err;
		db.collection('contatos').findOne({_id: _idContato}, 
			function(erro, contato) {
				if(erro) throw err;
				console.log(contato);
			}
		);
	}
);