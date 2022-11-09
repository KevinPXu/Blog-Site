const router = require("express").Router();
const { Post, User } = require("../models");
const auth = require("../utils/authenticate");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);

    res
      .status(200)
      .render("homepage", { posts, loggedIn: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", auth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);

    res
      .status(200)
      .render("dashboard", { posts, loggedIn: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard/create", auth, async (req, res) => {
  try {
    res.status(200).render("newPost", { loggedIn: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard/edit/:id", auth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });

    const post = postData.get({ plain: true });
    console.log(post);
    res
      .status(200)
      .render("editPost", { post, loggedIn: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
