import express from "express";
import reminderRouter from "./domains/reminder/router/index.js";
import userRouter from "./domains/user/router/index.js";
import authRouter from "./domains/user/auth/router/index.js";
import configureApp from "./config/app-config.js";
import { ErrorHandler } from "./config/index.js";
import authenticateToken from "./domains/user/auth/middleware/authenticate-token.js";
import csrfProtection from "./domains/user/auth/middleware/csrf-protection.js";

const app = express();

// Inject express server middleware config
configureApp(app);


app.use("/reminder", authenticateToken, csrfProtection, reminderRouter);
app.use("/user", authenticateToken, csrfProtection, userRouter);
app.use("/auth", authRouter);

app.get("/status", (req, res) => {
	res.send({message: "Epic Reminder API is online", version: process.env.npm_package_version});
})

app.use(ErrorHandler());

export default app;
