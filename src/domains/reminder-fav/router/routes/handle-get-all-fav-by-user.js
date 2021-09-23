import expressValidator from "express-validator";
import reminderFavServices from "../../service/index.js";

const { query } = expressValidator;

/**
 * route to get all reminders fav for the connected user
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */

 const validationRulesGetAllFavByUser = [
	query("userId").exists().isUUID()
];


const handleGetAllFavByUser = async (req, res) => {
	const { userId } = req.query;
	const allFavByUser = await reminderFavServices.getAllRemindersFavByUser(userId);
	res.send(allFavByUser);
};

export { validationRulesGetAllFavByUser, handleGetAllFavByUser };