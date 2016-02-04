mongoose = (require '../config').mongoose
bcrypt = require 'bcrypt-nodejs'

AdminSchema = mongoose.Schema {
	username: {
		type: String
		index: {uniqe:true}
	}

	password: {
		type: String
	}
}

AdminSchema.methods.storePassword = (password)->
	this.password = bcrypt.hashSync password, bcrypt.genSaltSync 10 , null

AdminSchema.methods.comparePassword = (password)->
	return bcrypt.compareSync password, this.password

module.exports = mongoose.model 'Admin',AdminSchema