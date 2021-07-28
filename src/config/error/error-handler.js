import { v4 as uuid } from "uuid";

import logger from "../logger/index.js";

const errorHandler = () => (err, req, res, next) => {
	// Generate an unique correlation id
	const id = uuid();

	// Logging the error stack with the correlation Id
	logger.error(`[${id}] - ${err.stack}`);

	// If the Error call has a specific Message
	if(err.customMessage) {
		logger.error(`[${id}] : additionnal message - ${err.customMessage}`);
	}

	// Default parameters for error to return from the endpoint
	const message = err.message || "Internal server error";
	const errorCode = err.code || 500;

	// Only send expectedErrors to the frontend else send a regular internal server error
	if(err.expectedError) {
		res.status(errorCode).send({error_id: id, error: message});
	} else {
		res.sendStatus(500);
	}
};

export default errorHandler;
