const express = require("express");
const { rateLimit } = require("express-rate-limit");

const port = 3000;

// initialize an Express server
const app = express();

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 10, // each IP can make up to 10 requests perf 5 min
    standardHeaders: true,
    legacyHeaders: false,
    // __defaults__
    // message: "Too many requests, please try again later."
    // statusCode: 429
});

app.use(limiter);

// define a sample endpoint
app.get("/hello-world", (req, res) => {
    res.send("Hello, World!");
});

// start the server
app.listen(port, () => {
    console.log(`Server listening at http://hostname:${port}`);
});

