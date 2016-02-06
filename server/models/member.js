var mongoose = require('../config').mongoose,
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt-nodejs'),
	MemberSchema = new Schema({
		name: {
			type:String,
			validate: {
				validator: function(name) {
					return name!=null;
				}
			}
		},

		branch: {
			type:String,
			validate: {
				validator: function(branch) {
					branch = branch.toLowerCase().trim();
					return branch=="cse"||branch=="it";
				}
			}
		},

		registrationNumber: {
			type:String,
			validate: {
				validator: function(reg){
					reg = reg.toUpperCase().trim();
					return reg!=null;
				}
			},
			index:{
				unique:true
			}
		},

		contactNumber: {
      		type: String,
      		index: {
        		unique: true
     		}
    	},
    
    	email: {
      		type: String,
      		index: {
        		unique: true
      		}
    	},

    	password: {
    		type: String
    	},

    	permanentAddress: {
    		type: String,
    		validate:{
    			validator: function(addr){
    				addr=addr.trim();
    				return addr!=null;
    			}
    		}
    	},

    	createdAt: {
    		type: Date,
    		default: Date.now
    	}
	});

MemberSchema.methods.clean = function(){
	this.name = this.name.trim();
	this.registrationNumber = this.registrationNumber.trim();
	this.branch = this.branch.trim();
	this.contactNumber = this.contactNumber.trim();
	this.email = this.email.trim();
	this.permanentAddress = this.permanentAddress.trim();
}

MemberSchema.methods.generateHash = function(password){
	this.password = bcrypt.genHashSync(password,bcrypt.genSaltSync(8),null);
}

MemberSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('Member',MemberSchema);