const GenericError = (code = 500, name = "InternalServerError", message = "Internal Server Error") => function (customMessage) {
	if(!customMessage) {
		this.message = message;
	}
	this.message = message;
	this.customMessage = customMessage;
	this.name = name;
	this.code = code;

	if (Error.captureStackTrace) {
		Error.captureStackTrace(this);
	}

	return this;
};

const NotFoundError = GenericError(404, "NotFoundError", "Entity Not Found");
const DatabaseError = GenericError(500, "DatabaseError", "Internal server error");

export {
	NotFoundError, DatabaseError
}
