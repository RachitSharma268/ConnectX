import httpStatus from "http-status";
import { User } from "../models/users.model.js";
import bcrypt, { hash } from "bcrypt";

import crypto from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: " Please Provide!" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({ message: "User not registered" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      let token = crypto.randomBytes(20).toString("hex");

      user.token = token;
      await user.save();
      res.status(httpStatus.OK).json({ token: token });
    } else {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid Username or Password" });
    }
  } catch (error) {
    res.status(500).json({ message: `Something Went Wrong ${error}` });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists!" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      username: username,
      password: hashPassword,
    });

    await newUser.save();
    res
      .status(httpStatus.CREATED)
      .json({ message: "User Registered Successfully" });
  } catch (error) {
    res.json(`Something went wrong ${error}`);
  }
};

export { login, register };
