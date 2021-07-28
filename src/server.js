import express from "express";
import reminderRouter from "./domains/reminder/router/index.js";
import configureApp from "./config/app-config.js";
import { ErrorHandler } from "./config/index";

const app = express();

// Inject express server middleware config
configureApp(app);

app.use("/reminder", reminderRouter);

app.get("/status", (req, res) => {
	res.send({message: "Epic Reminder API is online", version: process.env.npm_package_version});
})

app.use(ErrorHandler());

export default app;
