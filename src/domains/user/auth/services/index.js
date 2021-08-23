import jwt from "jsonwebtoken";

//TODO: ajouter les fonctions encrypt et decrypt pour le token

/**
 * generate JWT from user info
 * @param {Object} user
 * @return {string}
 */
const generateJwt = (user) => {
	const expire = process.env.JWT_EXPIRE;
	const token = jwt.sign(user, process.env.JWT_SECRET_SIGN, { expiresIn: expire });
	return token;
};

/**
 * decode JWT
 * @param {string} token
 * @return {{payload: *, signature: *, header: *}|*}
 */
const decodeJwt = (token) => {
	return jwt.decode(token);
};

export default { generateJwt, decodeJwt };
