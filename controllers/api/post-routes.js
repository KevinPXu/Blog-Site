const router = require("express").Router();
const { Post } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      text: req.body.text,
    });

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
