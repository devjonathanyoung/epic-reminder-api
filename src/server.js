import express from "express";
import reminderRouter from "./domains/reminder/index.js";
import configureApp from "./config/app-config.js";

const app = express();

// Inject express server middleware config
configureApp(app);

app.use("/reminder", reminderRouter);

app.get("/status", (req, res) => {
	res.send({message: "Digibul API is online", version: process.env.npm_package_version});
})

export default app;
