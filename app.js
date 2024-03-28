const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const User = require("./mongodb");
const nodemailer = require("nodemailer");
const port = 3001;
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var paths = path.join(__dirname, "../client/views/emailsend.html");
app.use(express.static(path.join(__dirname, "../client/public")));
app.use(express.static(path.join(__dirname, "../client/images/img_home")));
app.use(express.static(path.join(__dirname, "../client/images/login,signup")));
app.use(express.static(path.join(__dirname, "../client/images/coustomize")));
app.use(express.static(path.join(__dirname, "../client/javascript")));
// LOAD THE LOGIN PAGE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/views/login.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/views/login.html"));
});

app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/views/login.html"));
});

// LOAD THE SIGNIN PAGE
app.get("/signup.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/views/signup.html"));
});

app.post("/login.html", async (req, res) => {
  const userData = {
    username: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    // Create a new document in MongoDB using the User model
    const user = await User.create(userData);
    console.log("User saved successfully:", user);
    res.sendFile(path.join(__dirname, "../client/views/login.html"));
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Error saving user");
  }
});
app.use(express.static(path.join(__dirname, "../client/public")));

app.post("/finallogin", async (req, res) => {
  const email = req.body.email;
  var otp = 0;
  otp = Math.floor(1000 + Math.random() * 9000);
  console.log(otp);
  try {
    const check = await User.findOne({ email: req.body.email });
    if (check.password === req.body.password) {
      // res.sendFile(path.join(__dirname, "../client/views/emailsend.html"));
      res.sendFile(path.join(__dirname, "../client/views/emailsend.html"));
      // Create a transporter using SMTP
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sanjaysekar0321@gmail.com",
          pass: "awvt qqtm iixh osai",
        },
      });

      // Define email options
      let mailOptions = {
        from: "sanjaysekar0321@gmail.com",
        to: email,
        subject: "Complete Your Shopping Experience on COZYNEST",
        html: `<h3>Hii,You've successfully logged in, and your shopping journey continues.</h3><br><h1>Your Otp Is :${otp}</h1><br><h2>HAPPY SHOPPING :)</h2>`,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error occurred:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    } else {
      res.sendFile(path.join(__dirname, "../client/views/usernot.html"));
    }
  } catch (error) {
    res.sendFile(path.join(__dirname, "../client/views/usernot.html"));
  }

  app.post("/checkotp", (req, res) => {
    try {
      const otpinput = req.body.otp;
      if (otp == otpinput) {
        res.sendFile(path.join(__dirname, "../client/views/home.html"));
      } else {
        res.sendFile(path.join(__dirname, "../client/views/emailsend.html"));
      }
    } catch (error) {
      res.sendFile(path.join(__dirname, "../client/views/emailsend.html"));
    }
  });
});

app.get("/coustomize", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/views/coustomization.html"));
});

// app.get("/next", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/views/coustomized.html"));
// });

app.listen(port, () => {
  console.log(`Server Is Running On http://127.0.0.1:${port}`);
});
