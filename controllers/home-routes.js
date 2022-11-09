const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const auth = require("../utils/authenticate");

//get route for the home page which renders all posts that are already on the page and by which user
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

    //obtains the raw formatted JSON from the sequelize methods
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

// a get route that brings the user to their own dashboard which will load all posts they have created 
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

    //obtains the raw formatted JSON from the sequelize methods
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

//get rout that allows the user to create a new post by rendering a new post form
router.get("/dashboard/create", auth, async (req, res) => {
  try {
    res.status(200).render("newPost", { loggedIn: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//get route that allows the user to edit an existing post they created by rendering a new edit form
router.get("/dashboard/edit/:id", auth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });

    //obtains the raw formatted JSON from the sequelize methods
    const post = postData.get({ plain: true });
    res
      .status(200)
      .render("editPost", { post, loggedIn: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//gets a post by their own id as well as all the comments associated with it
router.get("/post/:id", auth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }],
    });

    const commentData = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    //obtains the raw formatted JSON from the sequelize methods
    const post = postData.get({ plain: true });
    const comment = commentData.map((comment) => comment.get({ plain: true }));

    res
      .status(200)
      .render("comment", { post, comment, loggedIn: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//gets the login form and renders it to the page
router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
