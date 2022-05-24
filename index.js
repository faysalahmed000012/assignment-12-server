const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.20nux.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();

    const productCollection = client.db("electrofirm").collection("products");
    const OrderCollection = client.db("electrofirm").collection("orders");

    app.get("/products", async (req, res) => {
      const products = await productCollection.find().toArray();
      res.send(products);
    });

    // load single product

    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
    });

    app.post("/orders", async (req, res) => {
      const order = req.body;
      const result = await OrderCollection.insertOne(order);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Welcome to electro firm");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
