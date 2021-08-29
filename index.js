import app from "./src/app.js"

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.info("Epic reminder API server is runnning");
});

server.keepAliveTimeout = parseInt(process.env.SERVER_KEEPALIVE_TIMEOUT || "65000", 10);
server.headersTimeout = parseInt(process.env.SERVER_HEADERS_TIMEOUT || "66000", 10);
