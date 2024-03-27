import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
	name: {
		type: String,
		unique: true,
	},
	watchList: [],
	money: {
		type: Number,
		default: 25000,
	},
	stocksBought: [],
});

const User = mongoose.model("User", userSchema);

export { User };
