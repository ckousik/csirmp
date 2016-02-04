###
Database config
###
mongoose = require 'mongoose'
###
Database params go here
###

###
Application config
###
express = require 'express'
expressSession = require 'express-session'
app = express()
app.use expressSession({
	secret:"temp-secret"
	})

module.exports = {
	mongoose:mongoose
	app:app
}