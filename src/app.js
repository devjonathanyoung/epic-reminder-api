import express from "express";

import configureApp from "./config/app-config.js";
import { ErrorHandler } from "./config/index.js";
import reminderRouter from "./domains/reminder/router/index.js";
import authenticateToken from "./domains/user/auth/middleware/authenticate-token.js";
import csrfProtection from "./domains/user/auth/middleware/csrf-protection.js";
import authRouter from "./domains/user/auth/router/index.js";
import userRouter from "./domains/user/router/index.js";

const app = express();

// Inject express server middleware config
configureApp(app);

// TODO: enlever temp. csrfProtection pour test création user et route user/current (SIGN UP)
app.use("/reminder", authenticateToken, csrfProtection, reminderRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.get("/status", (req, res) => {
	res.send({ message: "Epic Reminder API is online", version: process.env.npm_package_version });
});

app.use(ErrorHandler());

export default app;
