import express from "express";
import server from "./src/server.mjs";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Server is Alive");
})

server(app);

app.listen(port, () => {
    console.info("Express server is runnning");
});
