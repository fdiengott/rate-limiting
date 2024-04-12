const express = require("express");
const { slowDown } = require("express-slow-down");

const port = 3000;

// initialize an Express server
const app = express();

const limiter = slowDown({
    windowMs: 60 * 5 * 1000,
    delayAfter: 10,
    delayMs: (hits: number) => hits * 200, // adds 200 ms of delay to every req after 10 
    maxDelayMs: 5000, // max global delay of 5 seconds
});

app.use(limiter);

// could also have applied it like so:
// app.use("/hello-world", limiter)
// app.get("/hello-world", limiter, (req,res) => {...

// define a sample endpoint
app.get("/hello-world", (req, res) => {
    res.send("Hello, World!");
});

// start the server
app.listen(port, () => {
    console.log(`Server listening at http://hostname:${port}`);
});

