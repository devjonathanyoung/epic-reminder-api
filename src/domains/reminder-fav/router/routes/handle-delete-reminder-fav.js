import expressValidator from "express-validator";

import reminderFavServices from "../../service/index.js";

const { param } = expressValidator;

const validationRulesDeleteFav = [param("id").exists().isUUID()];

/**
 * route to delete a reminder
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
const handleDeleteReminderFav = async (req, res) => {
	const deletedReminder = await reminderFavServices.deleteReminderFav(req.params.id);
	res.send(deletedReminder);
};

export { validationRulesDeleteFav, handleDeleteReminderFav };