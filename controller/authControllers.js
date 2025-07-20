const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const {emailVerification, passwordValidation,} = require("../utils/validation.js");


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      console.log("Email already registered");
      return res.status(400).json({ msg: "User already exists" });
    }

    if (!passwordValidation(password)) {
      // password validation
      return res.status(400).json({
        msg: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }
    const isEmailValid = await emailVerification(email); // api call
    console.log("shailendra Kumar Yadav ", isEmailValid) 
    if (!isEmailValid) {
      return res.status(400).json({ message: "Invalid or undeliverable email" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save(); // saving data in database

    const payload = {
      id: newUser._id,
      email: newUser.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // generating token
    if (token) {
      console.log(`Signup successfully ${token}`);
      res.status(201).json({ message: "Signup successful", token });
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("user does not exist");
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const forgotPassword = async(req, res) =>{
  const {email, password} = req.body

  try {
     const isUserExist = await User.findOne({email}) // it will return complete object if found
    //  console.log(isUserExist) 
     if(!isUserExist) {
      return res.status(400).json({message:`user does not exist`})
     }
      
     if (!passwordValidation(password)) {
      // password validation
      return res.status(400).json({
        msg: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    isUserExist.password = hashedPassword;
    await isUserExist.save();
    res.status(200).json({ message: 'Password updated successfully' });

  }
  catch(error) {
    console.error('Error in forgotPassword:', error.message);
   return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { signup, login, forgotPassword };
