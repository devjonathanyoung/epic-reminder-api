import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import logger from "./logger/index.js";

const env = process.env.NODE_ENV;

const configureApp = (app) => {
	// Add Access logs middle ware
	app.use(morgan("combined", { stream: logger.stream }));

	// Apply security module
	app.use(helmet());

	// Remove X Powered By Header
	app.disable("x-powered-by");

	// Parse entries
	app.use(cookieParser());
	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	// Enable cors only if environment is local
	if (env === "local") {
		app.use(cors({ origin: process.env.AUTHORIZED_CORS_ORIGIN,
			credentials: true,
			exposedHeaders: ["error-type", "Content-Disposition", "csrf-token"] }));
	}
};

export default configureApp;
