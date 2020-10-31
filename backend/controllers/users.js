const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send({ message: "Email ID already registered" });

    user = await User.findOne({ email: req.body.username });
    if (user) return res.status(400).send({ message: "Username already in use" });

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);

    user = new User({
        ...req.body,
        password: hash
    });
    await user.save();
    
    const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, 'privateKey', { expiresIn: "1d"});
    res.send({ message: "User Registered successfully", token: token, username: user.username });
} catch (ex) {
    console.log(ex);
    res.status(500).send({ message: "Internal server error" });
}
}

exports.signInUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ message: "Invalid Email ID or password" });

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) return res.status(400).send({ message: "Invalid Email ID or password" });

    delete user.password;
    const token = jwt.sign({ id: user._id, email: user.email }, 'privateKey');
    res.send({ message: "User Logged in successfully", token: token, username: user.username, profileImage: user.profileImage });
  } catch (ex) {
      res.status(500).send({ message: "Internal server error" });
  }
}
