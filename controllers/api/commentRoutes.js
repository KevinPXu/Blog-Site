const router = require("express").Router();
const { Comment } = require("../../models");
//route to post a new comment to the database
//api/comment/
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
