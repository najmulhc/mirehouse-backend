const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const itemsCollection = client.db("summit-gear").collection("items");
    app.get("/", (req, res) => {
      res.send("hellow mellow yellow");
      console.log("connected with mongo");
    });
    app.post("/items/add", async (req, res) => {
      const item = req.body;
      const result = await itemsCollection.insertOne(item);
      res.send(result);
    });
    app.get("/items/all", async (req, res) => {
      const query = {};
      const result = await itemsCollection.find(query).toArray(); 
      res.send(result);
    });
    app.get("/items/my", async (req, res) => {
      const email = req.body.id;
      const query = { user: email };
      const result = await itemsCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/items/home", async (req, res) => {
      const query = {};
      const result = await itemsCollection.find(query).limit(6).toArray();
      res.send(result);
    });
    app.post("/item", async (req, res) => {
      const id = req.body._id.itemId;
      const query = { _id: ObjectId(id) };
      const result = await itemsCollection.findOne(query); 
      res.send(result);
    });
    app.put("/item/update", async (req, res) => {
      const { quantity, _id } = req.body;
      const filter = {_id: ObjectId(_id)};
      const updateDoc = {
        $set: {
          quantity:quantity
        },
      };
      const result = await itemsCollection.updateOne(filter, updateDoc);
      console.log(updateDoc);
      res.send(result)
    });
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("server started");
});
