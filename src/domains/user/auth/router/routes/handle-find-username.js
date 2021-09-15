import expressValidator from "express-validator";

import userServices from "../../../service/index.js";

const { param, matchedData } = expressValidator;

const validationRulesFindUsername = [param("username").exists()];

/**
 * route to get all users
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
const handleFindUsername = async (req, res) => {
	const user = matchedData(req);
	const { username } = user; 
	const isUserExist = await userServices.findUsername(username);
	res.send(isUserExist);
};

export { validationRulesFindUsername, handleFindUsername };