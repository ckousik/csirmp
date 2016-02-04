mongoose = (require '../config').mongoose

EventSchema = mongoose.Schema {
	name: {
		type: String
		validate: {
			validator: (name)->
				if name is undefined 
					return false
				return true

			message: "Name cannot be blank"
		}
	}
	description: {
		type: String
		validate: {
			validator: (desc)->
				if desc is undefined 
					return false
				return true

			message: "Description cannot be blank"
		}
	}
	date:{
		type: Date
		validate: {
			validator: (date)->
				if date is undefined 
					return false
				if date < Date.now()
					return false
				return true

			message: "Date is invalid"
		}
	}
	###
		Add a field to store people who have registered
	###
}

module.exports = mongoose.model 'Event',EventSchema