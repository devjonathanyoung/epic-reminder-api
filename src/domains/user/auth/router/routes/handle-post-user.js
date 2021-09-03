import argon2 from "argon2";
import expressValidator from "express-validator";
import userServices from "../../../service/index.js";

const { body, validationResult, matchedData } = expressValidator;

export const validationRulesCreateUser = [
	body("userName").exists(),
	body("firstName").exists(),
	body("lastName").exists(),
	body("password").exists()
];

/**
 * route to post (create) an user
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */

export const handlePostUser = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.json({ errors: errors.array() });
	}
	const validatedUser = matchedData(req);

	const hashPswd = await argon2.hash(validatedUser.password);

	await userServices.createUser({ ...validatedUser, password: hashPswd });

	next();
};
