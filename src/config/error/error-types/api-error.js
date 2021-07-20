/**
 * API Error definition
 * @param {number} code The code of the error (see [the error-code-map.json file])
 * @param {string} [message=""] Additional information relative to the error
 */
const APIError = function (code, message) {
	this.message = message || "Internal server error";
	this.name = "APIError";
	this.code = code || 500;

	if (Error.captureStackTrace) {
		Error.captureStackTrace(this);
	}

	return this;
};

export default APIError;
