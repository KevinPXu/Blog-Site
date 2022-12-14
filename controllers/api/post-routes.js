const router = require("express").Router();
const { Post } = require("../../models");

//post route to create new posts using a post form
router.post("/", async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      text: req.body.text,
      user_id: req.session.user_id,
    });

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//route to update a post at a given post id
router.put("/:id", async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        text: req.body.text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!postData) {
      res.status(400).json({ message: "no post found with that ID" });
    }
    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//route to delete a post at a given ID
router.delete("/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(400).json({ message: "no post found with that ID" });
    }
    res.status(200).json(postData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
