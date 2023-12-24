const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const maxAge = 3*24*60*60
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const createUser = async (req, res) => {
  const user = req.body
  try {
    if (!(user.email && user.name && user.password && user.mobile && user.role)) {
      res.json({message: "Fill all the fields"})
    }
    else {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.json({ message: "User already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = await User.create({ ...req.body, password: hashedPassword });
      const token = createToken(user._id)
      // res.setHeader("Access-Control-Allow-Credentials", "true");
      // res.cookie('jwt', token, { maxAge: maxAge * 1000})
      res.json({message: "User created successfully", user, token});
    }
  }
  } catch (error) {
    res.json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.json({message: 'This email is not registered.'})
    }
    else{
        const correctPassword = await bcrypt.compare(req.body.password, user.password)
        if(!correctPassword){
            res.json({message: "Incorrect Password"})
        }
        else{
            const token = createToken(user._id);
            // res.setHeader('Access-Control-Allow-Credentials', 'true')
            // res.cookie("jwt", token, {maxAge: maxAge * 1000 });
            res.json({message: "Login Successful", user, token})
        }
    }
  } catch (error) {
    res.json(error);
  }
};

const getUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findOne({_id: userId})
        res.json({user})
    } catch (error) {
        res.json(error)
    }
}

const deleteUser = async (req, res) => {
  try {
    const {userId} = req.params;
    const user = await User.findOneAndDelete({ _id: userId });
    res.json({message: 'User account deleted successfully'})
  } catch (error) {
    res.json(error)
  }
}

const updateUser = async (req, res) => {
  try {
    const {userId} = req.params;
    const user = await User.findOneAndUpdate({_id: userId}, {...req.body}, {new: true})
    res.json(user)
  } catch (error) {
    res.json(error)
  }
}
module.exports = { createUser, loginUser, deleteUser, getUser, updateUser };
