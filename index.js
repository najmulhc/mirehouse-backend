const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://admin:amiadmin@cluster0.uv0dp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    app.get('/', (req,res)=> {
        res.send("hellow mellow yellow")
    })
    app.post("/items/add", async(req,res) => {
        const item = req.body; console.log(item);
        res.send({result:"success"})
    })
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("server started");
});
