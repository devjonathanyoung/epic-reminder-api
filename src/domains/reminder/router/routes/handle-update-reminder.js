import expressValidator from "express-validator";

import reminderServices from "../../service/index.js";

const { body, validationResult, matchedData } = expressValidator;

const validationRulesUpdate = [
	body("type").optional().isIn(["movie", "book", "game"]),
	body("date").optional().isISO8601(),
	body("name").optional().notEmpty(),
	body("comment").optional()
];

/**
 * route to update a reminder
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
const handleUpdateReminder = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.json({ errors: errors.array() });
	}
	const validatedDatas = matchedData(req);
	const updatedReminder = await reminderServices.updateOneReminder(req.params.id, validatedDatas);

	res.send(updatedReminder);
};

export { validationRulesUpdate, handleUpdateReminder };