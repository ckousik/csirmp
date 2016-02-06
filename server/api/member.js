var Member = require('../models').Member;

var logError = function(name,err) {
	console.log(name+'\n'+JSON.stringify(err));
};

module.exports = {
	add : function(data) {
		var member = new Member(data);
		member.clean();
		member.generateHash();
		return member.save().then(function(mem) {
			return {member:mem};
		}).catch(function(err) {
			logError("member->add->",err);
			return {error:err};
		});
	},

	remove: function(id) {
		return Member.removeById(id).exec().then(function(member) {
			return {member:member};
		}).catch(function(err) {
			logError("member->remove->",err);
			return {error:err};
		});
	},

	getById: function(id) {
		return Member.findById(id).exec().then(function(member) {
			return {member:member};			
		}).catch(function(err) {
			logError("member->getById->",err);
		});
	},

	exists: function(id) {
		return Member.findById(id).exec().then(function(member){
			return {member:member};
		}).catch(function(err){
			logError("member->exists->",err);
		});
	}
}