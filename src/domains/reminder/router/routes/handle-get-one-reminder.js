import expressValidator from "express-validator";

import reminderServices from "../../service/index.js";

const { param } = expressValidator;

const validationRulesGetOneReminder = [param("id").exists().isUUID()];

/**
 * route to get one reminder
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */

const handleGetOneReminder = async (req, res) => {
	const reminder = await reminderServices.getOneReminder(req.params.id);
	res.send(reminder);
};

export { validationRulesGetOneReminder, handleGetOneReminder };