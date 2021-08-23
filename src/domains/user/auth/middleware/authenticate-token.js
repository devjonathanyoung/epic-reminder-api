import jwt from "jsonwebtoken";
import userService from "../../service/index.js";

//TODO: remplacer les res.send par APIError
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
		//TODO: delete console.log
		console.log("req.cookies", req.cookies);
		console.log("token", token);

		// if there isn't any token
		if (token == null) {
			res.setHeader("error-type", "TOKEN_INVALID");
			return res.sendStatus(403);
		}
	
		
		try {
			const user = jwt.verify(token, jwtSecret);
			const { id } = user;
			const storedUser = await userService.getUserById(id);

			if (!storedUser) {
				return res.sendStatus(403);
			}
			//set the req.user info
			req.user = { ...storedUser };
			return next();

		} catch (err) {
			return res.sendStatus(403);
		}
	}
	return res.sendStatus(401);
};

export default authenticateToken;
