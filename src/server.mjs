import reminderRouter from "./domains/reminder/index.mjs";

const server = (app) => {
    app.use("/reminder", reminderRouter);
};

export default server;