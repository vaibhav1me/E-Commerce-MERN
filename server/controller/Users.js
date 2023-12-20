const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
      res.json({message: "User created successfully", user});
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
        res.json({message: 'This email does not exist in our database.'})
    }
    else{
        const correctPassword = await bcrypt.compare(req.body.password, user.password)
        if(!correctPassword){
            res.json({message: "Incorrect login credentials"})
        }
        else{
            res.json({message: "Login Successful", user})
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
