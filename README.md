# Blog-Site

## Technologies Used

- JavaScript
- bootstrap
- Node.js
- express.js
- nodemon.js
- mysql + mysql express package
- dotenv
- sequelize
- bcrypt
- express-handlebars
- express-sessions
- console.table
- VS Code
- Git
- GitHub

## Summary

This project was created to obtain a better understanding of using a MVC architectural file format. We created Models through using the Sequelize ORM, created routes through the controller file and using express.js to create RESTful routes, and used handlebars to view frontend HTML and to generate a dynamic front end. We also used express sessions and utilized cookies to ensure logins were able to persist as well as protected user information by hashing the users password. We also were able to protect our own information by utilizing environmental variables.

## Demonstration

View demo: https://drive.google.com/file/d/1FnuCRH5DoPq2jmeOfViyXZfG9ldfcpzG/view

## Description

A blog site that allows a user to view all existing blog posts. The user is then allowed to create an account with a username and password. Once the user is logged in, they are redirected to their own dashboard where they are able to create posts to their own page which will also populate on the front page of the site. Once a post is created, the user who created the post can click on it in their dashboard and edit the contents of the post. The user will also have an option to delete the post. On the home page, the user is able to click on a post as long as they are logged in, and comment on a specific post. Once the user is finished browsing the site, they can click the logout button to logout. If they choose to return to the site, they can use the login form with their existing credentials to access their existing dashboard. If they forget to logout, they will stay logged in for 5 minutes before the site will automatically log you out.

## Deployed Link

https://glacial-garden-01796.herokuapp.com/

## Code Snippet

### Relationships between the models

```JavaScript
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//links posts to users where posts belong to users
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//links users to comments where users have many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//links comments to users where comments belong to users
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

//links posts to comments where posts have many comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

//links comments to posts where comments belong to posts
Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});
```

### example of a RESTful get request

```JavaScript
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
```

### utilization of username and password validation and usage of session and cookie storage

```JavaScript
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
```

## Author Links

[LinkedIn](https://www.linkedin.com/in/kevin-xu-4672a7215/)
[GitHub](https://github.com/KevinPXu)
1
