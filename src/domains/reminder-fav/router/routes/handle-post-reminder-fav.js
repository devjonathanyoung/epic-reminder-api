import expressValidator from "express-validator";

import reminderFavServices from "../../service/index.js";

const { body, validationResult, matchedData } = expressValidator;

const validationRulesAddFav = [
	body("reminder_id").exists(),
	body("user_id").exists(),
];

/**
 * route to post (create) a reminder
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */

const handlePostReminderFav = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.json({ errors: errors.array() });
	}
	const validateDatas = matchedData(req);

	const resultCreation = await reminderFavServices.addReminderFav(validateDatas);
	res.send(resultCreation);
};

export { validationRulesAddFav, handlePostReminderFav };