import reminderServices from "../../service/index.js";
import expressValidator from "express-validator";
const { param } = expressValidator;

export const validationRulesGetOneReminder = [ param("id").exists().isUUID() ];

/**
 * route to get one reminder
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */

export const handleGetOneReminder = async (req, res) => {
    const reminder = await reminderServices.getOneReminder(req.params.id);
    res.send(reminder);
};