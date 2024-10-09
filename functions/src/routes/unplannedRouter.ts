import express from "express";
import { getClient } from "../db";
import { ObjectId } from "mongodb";
import Account from "../models/Account";

const AccountRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

// get all Account
AccountRouter.get("/account", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Account>("accounts").find();
    const results = await cursor.toArray();
    res.status(200).json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

// get Account by ID
AccountRouter.get("/account/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const client = await getClient();
    const Account = await client
      .db()
      .collection<Account>("accounts")
      .findOne({ _id });
    if (Account) {
      res.status(200).json(Account);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

// create new Account
AccountRouter.post("/account", async (req, res) => {
  try {
    const Account: Account = req.body;
    const client = await getClient();
    await client.db().collection<Account>("accounts").insertOne(Account);
    res.status(201).json(Account);
  } catch (err) {
    errorResponse(err, res);
  }
});

// delete Account by ID
AccountRouter.delete("/account/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
      .deleteOne({ _id });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

// replace / update Account by ID
AccountRouter.put("/account/:id", async (req, res) => {
  try {
    const _id: ObjectId = new ObjectId(req.params.id);
    const updatedAccount: Account = req.body;
    delete updatedAccount._id; // remove _id from body so we only have one.
    const client = await getClient();
    const result = await client
      .db()
      .collection<Account>("accounts")
      .replaceOne({ _id }, updatedAccount);
    if (result.modifiedCount) {
      updatedAccount._id = _id;
      res.status(200).json(updatedAccount);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default AccountRouter;
