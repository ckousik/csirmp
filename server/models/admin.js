var mongoose = require('../config').mongoose,
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs'),
	AdminSchema = new Schema({
		username: {
			type: String,
			index: {unique: true}
		},

		password: String,

		created_at: {
			type:Date,
			default: Date.now
		}
	});

AdminSchema.methods.clean = function(){
	this.username = this.username.trim();
}

AdminSchema.methods.generateHash = function(password){
	this.password = bcrypt.genHashSync(password,bcrypt.genSaltSync(10),null);
}

AdminSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('Admin',AdminSchema);