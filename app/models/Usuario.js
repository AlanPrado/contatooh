var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
	var usuario = {
					login: {
						type: String,
						required: true,
						index: {
							unique: true
						}
					},
					nome: {
						type: String,
						required: true,
					},
					inclusao: {
						type: Date,
						default: Date.now
					}
				  };
	var schema = mongoose.Schema(usuario);
	schema.plugin(findOrCreate);
	return mongoose.model('Usuario', schema);
}