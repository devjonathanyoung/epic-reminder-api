import expressValidator from "express-validator";

import reminderServices from "../../service/index.js";

const { param } = expressValidator;

const validationRulesDelete = [param("id").exists().isUUID()];

/**
 * route to delete a reminder
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
const handleDeleteReminder = async (req, res) => {
	const deletedReminder = await reminderServices.deleteOneReminder(req.params.id);
	res.send(deletedReminder);
};

export { validationRulesDelete, handleDeleteReminder };