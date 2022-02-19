const mongoose = require("mongoose");

const mySchema = mongoose.Schema({
	name: {
		type: String,
	},
	course: {
		type: String,
	},
});

module.exports = mongoose.model("checkers", mySchema);
