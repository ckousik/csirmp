mongoose = (require '../config').mongoose

MemberSchema = mongoose.Schema {
	name: {
		type: String
		validate: {
			validator: (name)->
				if name is undefined
					return false
				return true
		}
	}

	regNumber: {
		type: String
		index: {uniqe:true}
	}

	created_at: {
		type:Date,
		default: Date.now
	}
} 

module.exports = mongoose.model 'Member',MemberSchema