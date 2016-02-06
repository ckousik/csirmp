var mongoose = require('../config').mongoose,
	Schema = mongoose.Schema,
	EventSchema = new Schema({
		name:{
			type:String,
			index: {unique:true}
		},
		description: {
			type:String,
			validate:{
				validator: function(desc){
					desc = desc.trim();
					return desc!=null;
				}
			}
		},
		event_date: {
			type: Date,
			validate: {
				validator: function(date){
					return date!=null && date > Date.now();
				}
			}
		},

		created_at:{
			type: Date,
			default: Date.now
		},

		membersRegistered : [{
			type: Schema.Types.ObjectId,
			ref: 'Member'
		}]
	});

EventSchema.methods.clean = function(){
	this.name = this.name.trim();
	this.description = this.description.trim();
}

module.exports = mongoose.model('Event',EventSchema);