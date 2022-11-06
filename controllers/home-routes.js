const router = require("express").Router();
const { Post } = require("../models/posts");

router.get("/", async (req, res) => {
  try {
    // const postData = await Post.findAll({
    //   // include: []
    // });

    // const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
