var mongoose = require('mongoose');

module.exports = function(uri) {
	mongoose.connect(uri);
	
	mongoose.connection.on('connected', function()    { console.log('Mongoose! Conectado em ' + uri); })
					   .on('disconnected', function() { console.log('Mongoose! Desconectado de ' + uri); })
					   .on('error', function(erro)    { console.log('Mongoose! Erro de conexão ' + erro); });

	process.on('SIGINT', 
		function() {
			mongoose.connection.close(function() {
				console.log('Mongoose! Desconectado pelo termino da aplicação')
				process.exit(0);
			});
		}
	)
}