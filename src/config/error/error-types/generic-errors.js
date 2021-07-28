const GenericError = (code = 500, name = "InternalServerError", message = "Internal Server Error") => function (customMessage) {
	// Check if ApiError has been called with new to make sure "this" exists
	if (!new.target) {
		throw Error("APIError has not been called with new")
	}

	if(!customMessage) {
		this.message = message;
	}
	this.message = message;
	this.customMessage = customMessage;
	this.name = name;
	this.code = code;
	this.expectedError = true;

	if (Error.captureStackTrace) {
		Error.captureStackTrace(this);
	}

	return this;
};

const NotFoundError = GenericError(404, "NotFoundError", "Entity Not Found");
const DatabaseError = GenericError(500, "DatabaseError", "Internal server error");
const InternalServerError = GenericError(500, "InternalServerError", "Internal server error");
const BadRequest = GenericError(400, "Bad request", "Bad request");

export {
	NotFoundError, DatabaseError, BadRequest, InternalServerError
}
