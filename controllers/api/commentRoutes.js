const router = require("express").Router();
const { Comment } = require("../../models");

router.post("/:id", async (req, res) => {
  try {
    const commentData = await Comment.create({
      text: req.body.text,
      user_id: req.session.user_id,
      post_id: req.params.id,
    });

    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
