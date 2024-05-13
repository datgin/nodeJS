import User from "../models/user.js";
import authValidate from "../validations/authValidate.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = authValidate.validate(req.body, { abortEarly: false });
    if (error) {
      const err = error.details.map((err) => err.message);
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({
        status: 400,
        message: "User already exist",
      });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, password: hashedPassword });

    newUser.password = undefined;

    return res.status(200).json({
      status: 200,
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = authValidate.validate(req.body, { abortEarly: false });
    if (error) {
      const err = error.details.map((err) => err.message);
      return res.status(400).json({
        status: 400,
        message: err,
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        status: 400,
        message: "Incorrect password",
      });
    }

    const token = Jwt.sign({ id: user._id }, "secret", {
      expiresIn: "1d",
    });

    user.password = undefined;

    return res.status(200).json({
      status: 200,
      data: user,
      token,
      message: "Login successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
