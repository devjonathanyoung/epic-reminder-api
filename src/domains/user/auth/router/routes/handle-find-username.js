import expressValidator from "express-validator";

import userServices from "../../../service/index.js";

const { param } = expressValidator;

export const validationRulesFindUsername = [param("username").exists()];

/**
 * route to get all users
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
export const handleFindUsername = async (req, res) => {
	const username = req.params.username;
	const isUserExist = await userServices.findUsername(username);
	res.send(isUserExist);
};
