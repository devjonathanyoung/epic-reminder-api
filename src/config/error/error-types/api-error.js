/**
 * API Error definition
 * @param {number} code The code of the error
 * @param {string} [message=""] Additional information relative to the error
 */
const APIError = function (code, message) {

	// Check if ApiError has been called with new to make sure "this" exists
	if (!new.target) {
		throw Error("APIError has not been called with new")
	}

	let errorCode;
	if(typeof code !== "number" || !code) {
		errorCode = 500;
	} else {
		errorCode = code;
	}

	// Store the parameters in the error object (this)
	this.message = message || "Internal server error";
	this.code = errorCode;
	this.expectedError = true;

	// Capture the stack Trace for it to be logged
	if (Error.captureStackTrace) {
		Error.captureStackTrace(this);
	}

	return this;
};

export default APIError;
