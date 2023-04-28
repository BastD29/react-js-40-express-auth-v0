const express = require("express");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

const users = [];

// TODO: add a check so user cannot access page if not logged in (checkAuthenticated)
app.get("/", (req, res) => {
  // no need to use res.render as we are using react-router-dom
  // res.render("Home.js");

  res.json(users);
});

// REGISTER

// TODO: add a check so user cannot access page if already logged in (checkNotAuthenticated)
app.get("/signup", (req, res) => {
  // res.json(users);
});

app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    users.push(user);
    // redirection on client side
    // res.redirect("/login");

    // res.status(201).send();
    res.status(201).json(user);
  } catch {
    // res.redirect("/signup");
    res.status(500).send();
  }

  console.log(users);
});

// LOGIN

// TODO: add a check so user cannot access page if already logged in (checkNotAuthenticated)
app.get("/login", (req, res) => {});

app.post("/login", async (req, res) => {
  // TODO: add a check "userAlreadyExists"
  const user = users.find((user) => user.email === req.body.email);

  if (!user) {
    return res.status(400).send("Cannot find user");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      // res.send("Success");
      res.json({ success: true });
    } else {
      // res.send("Not allowed");
      res.json({ success: false });
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(5000);
