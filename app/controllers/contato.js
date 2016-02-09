var sanitize = require('mongo-sanitize');

module.exports = function(app) {
	var Contato = app.models.contato;
	var controller = {};
	
	controller.listaContatos = function(req, resp) {
		Contato.find().populate("emergencia").exec()
			   .then(
					function(contatos) {
						resp.json(contatos);
					},
					function(erro) {
						console.error(erro);
						resp.status(500).json(erro);
					}
			   );
	};
	
	controller.obtemContato = function(req, resp) {
		var _id = sanitize(req.params.id);
		Contato.findById(_id).exec()
			   .then(
					function(contato) {
						if(!contato) {
							throw new Error('Contato não encontrado');
						}
						resp.json(contato);
					},
					function(erro) {
						console.error(erro);
						resp.status(404).send(erro);
					}
			   );
	};
	
	controller.removeContato = function(req, resp) {
		var _id = sanitize(req.params.id);
		Contato.remove({"_id": _id }).exec()
			   .then(
					function() {
						resp.end();
					},
					function(erro) {
						return console.error(erro);
					}
			   );
	};
	
	controller.salvaContato = function(req, resp) {
		var _id = sanitize(req.body._id);
		req.body.emergencia = req.body.emergencia || null;

		var dados = {
			"nome" : sanitize(req.body.nome),
			"email" : sanitize(req.body.email),
			"emergencia" : sanitize(req.body.emergencia) || null
		};
		
		if(_id) {
			Contato.findByIdAndUpdate(_id, dados).exec()
				   .then(
						function(contato) {
							resp.json(contato);
						},
						function(erro) {
							console.error(erro);
							resp.status(500).json(erro);
						}
				   );
		} else {
			Contato.create(dados)
				   .then(
						function(contato) {
							resp.status(201).json(contato);
						},
						function(erro) {
							console.error(erro);
							resp.status(500).json(erro);
						}
				   );
		}
	};
	
	return controller;
};