Event = require('../models').Event;
MemberApi = require('./member');

module.exports = {
	add: function(data) {
		var event = new Event(data);
		event.clean();
		return event.save().then(function(ev) {
			return {event: ev};
		}).catch(function(err) {
			return {error: err}; 
		});
	},

	remove: function(id) {
		return Event.findByIdAndRemove(id).exec().then(function(event) {
			return {event: event};
		}).catch(function(err) {
			return {error:err};
		});
	},

	getById: function(id) {
		return Event.findById(id).exec().then(function(event){
			return {event:event};
		}).catch(function(err) {
			return {error:err};
		});
	},

	exists: function(id) {
		return Event.findById(id).exec().then(function(event){
			if(!event)
				return false;
			return {event:event};
		}).catch(function(err) {
			if(err){
				return false;
			}
		});
	},

	registerMember: function(memberId, eventId) {
		if(!MemberApi.exists(memberId))
			return {error: "User not found"};
		return Event.findByIdAndUpdate(eventId,{
			$addToSet: {"membersRegistered":memberId}
		}).exec().then(function(event) {
			return { event:event };
		}).catch(function(err) {
			return {error: err};
		});
	}
}