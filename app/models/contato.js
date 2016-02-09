var mongoose = require('mongoose');

module.exports = function() {
	var contato = { 
					nome: { 
						type: String, 
						required: true
					},
					email: { 
						type: String, 
						required: true,
						index: {
							unique: true
						}
					},
					emergencia: {
						type: mongoose.Schema.ObjectId,
						ref: 'Contato'
					}
				 };
	var schema = mongoose.Schema(contato);
	return mongoose.model('Contato', schema);
}