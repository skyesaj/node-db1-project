const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    return res.json(await db("accounts").select());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    return res.json(
      await db("accounts")
        .where("id", req.params.id)
        .first()
    );
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    };
    const [id] = await db("accounts").insert(payload);
    return res.json(
      await db("accounts")
        .where("id", id)
        .first()
    );
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    await db("accounts")
      .where("id", req.params.id)
      .update(req.body);
    return res.json(
      await db("accounts")
        .where("id", req.params.id)
        .first()
    );
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await db("accounts")
      .where("id", req.params.id)
      .del();
    return res.status(204).json(req.params.id);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
