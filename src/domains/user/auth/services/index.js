import crypto from "crypto";

import jwt from "jsonwebtoken";

const algorithm = "aes-256-ctr";
const ENCRYPTION_KEY = Buffer.from(process.env.JWT_SECRET_ENCRYPT, "base64");

/**
 * encrypt in hex and concat iv hex
 * @param {string} text
 * @return {string} encrypted text
 */
const encrypt = (text) => {
	// encrypt in hex
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, "hex"), iv);
	const encrypted = cipher.update(text);
	// concat iv hex and encrypt hex
	return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

/**
 * decrypt text
 * @param {string} text to decrypt
 * @return {string} decrypted string
 */
const decrypt = (text) => {
	// getting iv and encrypted part
	const textParts = text.split(":");
	const iv = Buffer.from(String(textParts.shift()), "hex");
	const encryptedText = Buffer.from(String(textParts.shift()), "hex");

	// create decipher object and decrypt text
	const decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, "hex"), iv);
	const decrypted = decipher.update(encryptedText);
	return decrypted.toString();
};

/**
 * generate JWT from user info
 * @param {Object} user
 * @return {string}
 */
const generateJwt = (user) => {
	const expire = process.env.JWT_EXPIRE;
	const token = jwt.sign(user, process.env.JWT_SECRET_SIGN, { expiresIn: expire });
	return encrypt(token);
};

/**
 * decode JWT
 * @param {string} token
 * @return {{payload: *, signature: *, header: *}|*}
 */
const decodeJwt = (token) => {
	const tokenDecrypt = decrypt(token);
	return jwt.decode(tokenDecrypt);
};

export default { generateJwt, decodeJwt, encrypt, decrypt };
