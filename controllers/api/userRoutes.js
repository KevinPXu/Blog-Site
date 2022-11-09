const router = require("express").Router();
const { User } = require("../../models");

//post route to create a new user
router.post("/", async (req, res) => {
  try {
    console.log(req.body.username);
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    //saves the users session information to a cookie
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//post route to allow the user to login to the site based on the users username and password
router.post("/login", async (req, res) => {
  try {
    //checks the users username
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    //validates the users password to make sure the plaintext is the same as the hash
    const validPassword = await userData.checkPassword(req.body.password);
    console.log(validPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    //saves the login session to a cookie
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "Logged In" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//allows the user to logout by removing the session from the cookie
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
