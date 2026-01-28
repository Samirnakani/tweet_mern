import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import Tweet from "../model/tweet.js";
const router = express.Router();

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "tweet text is required" });
    }

    const tweet = await Tweet.create({
      text,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      author: req.user.id,
    });

    res.status(201).json(tweet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .populate("author", "uname profilePic")
      .sort({ createdAt: -1 });

    res.json(tweets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return res.status(404).json({ message: "tweet not found" });
    }

    if (tweet.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "not allowed" });
    }

    await tweet.deleteOne();
    res.json({ message: "tweet deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { text } = req.body;

    const tweet = await Tweet.findById(req.params.id);

    if (!tweet) {
      return res.status(404).json({ message: "tweet not found" });
    }

    if (tweet.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "not allowed" });
    }

    tweet.text = text || tweet.text;
    await tweet.save();

    res.json(tweet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
});

export default router;
