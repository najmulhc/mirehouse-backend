const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
 
app.use(express.json())
app.use(cors());

app.get("/", (req,res) => {
    res.send("first data from server")
})
app.listen(port, () => {
    console.log("server started");
})