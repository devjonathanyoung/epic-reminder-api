/**
 * API Error definition
 * @param {number} code The code of the error
 * @param {string} [message=""] Additional information relative to the error
 */
const APIError = function (code, message) {
	console.log("dans API Error => code", code);
	console.log("dans API Error => message", message);

	message = message || "Internal server error";
	code = code || 500;

	/* if (Error.captureStackTrace) {
		console.log("dans API Error capture stack")
		Error.captureStackTrace(this);
	} */

	return {code, message};
};

export default APIError;
