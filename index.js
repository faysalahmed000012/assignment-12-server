const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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
    const paymentCollection = client.db("electrofirm").collection("payments");

    // verifyadmin
    const verifyADMIN = async (req, res, next) => {
      const register = req.decoded.email;
      const requesterAccount = await userCollection.findOne({
        email: register,
      });
      if (requesterAccount.role === "admin") {
        next();
      } else {
        return res.status(403).send({ message: "forbidden access" });
      }
    };

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
    // delete product by id
    app.delete("/product/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = productCollection.deleteOne(query);
      res.send(result);
    });

    // payment

    app.post("/create-payment-intent", verifyJWT, async (req, res) => {
      const order = req.body;
      const price = order.price;
      const amount = price * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    // save payment

    app.put("/order/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const payment = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          status: "paid",
          transactionId: payment.transactionId,
        },
      };
      const result = await paymentCollection.insertOne(payment);
      const updatedOrder = await OrderCollection.updateOne(
        filter,
        updateDoc,
        options
      );

      res.send(updateDoc);
    });

    app.put("/order/paid/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          status: "shipped",
        },
      };
      const result = await OrderCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // add product

    app.post("/products", verifyJWT, async (req, res) => {
      const body = req.body;
      const product = await productCollection.insertOne(body);
      res.send(product);
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

    // get order by id

    app.get("/order/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await OrderCollection.findOne(query);
      res.send(result);
    });

    // delete order
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

    app.get("/user/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      res.send(user);
    });

    app.put("/user/update/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const filter = { email: email };
      const updateDoc = {
        $set: {
          education: user.education,
          location: user.location,
          phone: user.phone,
          linkedIn: user.linkedIn,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);

      return res.send(result);
    });

    // get all users
    app.get("/users", verifyJWT, async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    // get admin
    app.get("/admin/:email", async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email: email });
      const isAdmin = user?.role === "admin";
      res.send({ admin: isAdmin });
    });

    // make admin

    app.put("/users/admin/:email", verifyJWT, verifyADMIN, async (req, res) => {
      const email = req.params.email;

      const filter = { email: email };
      const updateDoc = {
        $set: { role: "admin" },
      };
      const result = await userCollection.updateOne(filter, updateDoc);

      return res.send(result);
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
