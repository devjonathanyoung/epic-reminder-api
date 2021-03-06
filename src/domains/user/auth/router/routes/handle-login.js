import expressValidator from "express-validator";

import userServices from "../../../service/index.js";
import authServices from "../../services/index.js";

const { body, validationResult, matchedData } = expressValidator;

const validationRulesUserLogin = [
	body("userName").exists(),
	body("password").exists()
];

/**
 * route to get all users
 * @param {Object} req - Express request object containing the reminder object in the req body
 * @param {Object} res - Express response object
 */
const handleLogin = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.json({ errors: errors.array() });
	}
	const validatedUser = matchedData(req);

	const userAuthorized = await userServices.checkUserForLogin(validatedUser);
	const userTokenGenerated = authServices.generateJwt(userAuthorized);

	const tokenDecoded = authServices.decodeJwt(userTokenGenerated);

	// set cookie expiration as same date from jwt => convert to milliseconds ( * 1000)
	const cookieExpirationDate = new Date(tokenDecoded.exp * 1000);

	if (!userAuthorized) {
		return res.send(403);
	}

	return res
		.cookie("jwt", userTokenGenerated, { httpOnly: true, secure: process.env.NODE_ENV !== "local", expires: cookieExpirationDate, sameSite: "lax" })
		.status(200)
		.json({ message: "Logged in successfully 😊 👌" });
};

export { validationRulesUserLogin, handleLogin };