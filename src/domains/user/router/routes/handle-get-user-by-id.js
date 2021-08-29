import expressValidator from "express-validator";

import userServices from "../../service/index.js";

const { param } = expressValidator;

export const validationRulesGetUserById = [param("id").exists().isUUID()];

/**
 * route to get all users
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
export const handleGetUserById = async (req, res) => {
	const userId = req.params.id;
	const user = await userServices.getUserById(userId);
	res.send(user);
};
