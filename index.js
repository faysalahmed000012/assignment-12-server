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

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "unauthorize access" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(403).send({ message: "forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}

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
    const userCollection = client.db("electrofirm").collection("users");
    const reviewCollection = client.db("electrofirm").collection("reviews");

    // get products
    app.get("/products", async (req, res) => {
      const products = await productCollection.find().toArray();
      res.send(products);
    });

    // load single product

    app.get("/product/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
    });

    app.delete("/product/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = productCollection.deleteOne(query);
      res.send(result);
    });

    // post order
    app.post("/orders", async (req, res) => {
      const order = req.body;
      const result = await OrderCollection.insertOne(order);
      res.send(result);
    });

    // get all orders
    app.get("/orders", verifyJWT, async (req, res) => {
      const orders = await OrderCollection.find().toArray();
      res.send(orders);
    });

    // get order by user

    app.get("/orders/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await OrderCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/order/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await OrderCollection.deleteOne(query);
      res.send(result);
    });

    // put user
    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };

      const result = await userCollection.updateOne(filter, updateDoc, options);
      const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN, {
        expiresIn: "2d",
      });
      res.send({ result, token });
    });

    // get all users
    app.get("/users", verifyJWT, async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    // add a review

    app.post("/reviews", verifyJWT, async (req, res) => {
      const data = req.body;
      const review = await reviewCollection.insertOne(data);
      res.send(review);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Welcome to electro firm");
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
