const express = require("express");
const Model = require("./ModelSchema");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const getModel = await Model.find();
		res.status(200).json({ message: "Models found", data: getModel });
	} catch (err) {
		res.status(400).json({ message: "Error found" });
	}
});

router.post("/", async (req, res) => {
	try {
		const getModel = await Model.create(req.body);
		res.status(200).json({ message: "Models found", data: getModel });
	} catch (err) {
		res.status(400).json({ message: "Error found" });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const getModel = await Model.findById(req.params.id, req.body);
		res.status(200).json({ message: "Models found", data: getModel });
	} catch (err) {
		res.status(400).json({ message: "Error found" });
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const getModel = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.status(200).json({ message: "Models found", data: getModel });
	} catch (err) {
		res.status(400).json({ message: "Error found" });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await Model.findByIdAndRemove(req.params.id, req.body);
		res.status(200).json({ message: "Models deleted" });
	} catch (err) {
		res.status(400).json({ message: "Error found" });
	}
});

module.exports = router;
