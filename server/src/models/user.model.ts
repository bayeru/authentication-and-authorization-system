import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

	name: {
		type: String,
		required: true,
		minLength: 2,
		maxLength: 60
	},

	email: {
		type: String,
		required: true,
		minLength: 5,
		maxLength: 100,
		unique: true
	},

	password: {
		type: String,
		required: true,
		minLength: 5,
		maxLength: 100
	}

});

export default mongoose.model("User", userSchema);