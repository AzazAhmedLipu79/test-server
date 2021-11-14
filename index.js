const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");
var bodyParser = require("body-parser");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jpi2e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("PosMania_Admin");
    const GasTrickCollection = database.collection("GasTrickCollection");
    const PhysicsOffCollection = database.collection("PhysicsOff");
    const ApolloShortCollection = database.collection("Apollo Short ");
    const PhoenixShortCollection = database.collection("Phoenix Short ");

    app.post("/GasTrickAdmin", async (req, res) => {
      const result = await GasTrickCollection.insertOne(req.body);
      console.log(result);
      // console.log(GastrickClass);
      res.json(result);
    });

    app.get("/GasTrickAdmin", async (req, res) => {
      const result = await GasTrickCollection.find({}).toArray();
      res.json(result);
    });

    //Physics off
    app.post("/PhysicsOffAdmin", async (req, res) => {
      const result = await PhysicsOffCollection.insertOne(req.body);
      // console.log(result);
      // console.log(GastrickClass);
      res.json(result);
    });

    app.get("/PhysicsOffAdmin", async (req, res) => {
      const result = await PhysicsOffCollection.find({}).toArray();
      res.json(result);
    });
    //Apollo SHort
    app.post("/ApolloShortAdmin", async (req, res) => {
      const result = await ApolloShortCollection.insertOne(req.body);
      // console.log(result);
      // console.log(GastrickClass);
      res.json(result);
    });

    app.get("/ApolloShortAdmin", async (req, res) => {
      const result = await ApolloShortCollection.find({}).toArray();
      res.json(result);
    });
    //Phoenix SHort
    app.post("/PhoenixShortAdmin", async (req, res) => {
      const result = await PhoenixShortCollection.insertOne(req.body);
      // console.log(result);
      // console.log(GastrickClass);
      res.json(result);
    });

    app.get("/PhoenixShortAdmin", async (req, res) => {
      const result = await PhoenixShortCollection.find({}).toArray();
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server Physics Of Stupid!");
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
