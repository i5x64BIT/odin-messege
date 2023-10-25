import express from "express";
import {
  getMesseges,
  pushMessege,
  updateUpvote,
} from "../controllers/MessegeController.js";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.use((req, res, next) => {
  res.setHeader("content-type", "application/json");
  next();
});
router.get("/api/messeges", (req, res) => {
  try {
    getMesseges().then((data) => res.send(data));
  } catch {
    res.status(500);
    res.json({ messege: "Something went wrong" });
  }
});
router.post("/api/messeges", (req, res) => {
  try {
    pushMessege(req.query.text).then(() => {
      res.status(200);
      res.json({ messege: "OK" });
    });
  } catch {
    res.status(500);
    res.json({ messege: "Something went wrong" });
  }
});
router.put("/api/messeges", (req, res) => {
  try {
    updateUpvote(req.query._id ,req.query.action).then((newDoc) => {
      res.status(200);
      res.json(newDoc);
    });
  } catch {
    res.status(500);
    res.json({ messege: "Something went wrong" });
  }
});

export default router;
