import jwt from "jsonwebtoken";

import userService from "../../service/index.js";
import authService from "../services/index.js";

// TODO: remplacer les res.send par APIError
/**
 * Authentication middleware. Gather the jwt access token from the request header
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next function
 */
const authenticateToken = async (req, res, next) => {
	const jwtSecret = process.env.JWT_SECRET_SIGN;

	if (req) {
		const token = req.cookies.jwt;

		// if there isn't any token
		if (!token) {
			res.setHeader("error-type", "TOKEN_INVALID OR DOESN'T EXIST");
			return res.sendStatus(401);
		}

		// decrypt the token to be able to authenticate it
		const tokenDecrypt = authService.decrypt(token);

		try {
			const user = jwt.verify(tokenDecrypt, jwtSecret);
			const { id } = user;
			const storedUser = await userService.getUserById(id);

			if (!storedUser) {
				return res.sendStatus(401);
			}
			// set the req.user info
			req.user = { id: storedUser.id };
			return next();
		} catch (err) {
			return res.sendStatus(403);
		}
	}
	return res.sendStatus(401);
};

export default authenticateToken;
