import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/auth.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name) {
      return res.send({ message: "Name is Required!" });
    }
    if (!email) {
      return res.send({ message: "E-mail is Required!" });
    }
    if (!password) {
      return res.send({ message: "Password is Required!" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required!" });
    }

    const exisitingUser = await userModel.findOne({ email });

    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "You already have an account please Sign in!",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "Sign Up Succesfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration!",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password!",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Email is not registered!",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.status(200).send({
        success: false,
        message: "Invalid Password!",
      });
    }
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.status(200).send({
      success: true,
      message: "Sign In Succesfully!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Sign In failed!",
      error,
    });
  }
};

export const testController = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Hello Admin!",
    });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email) {
      res.status(400).send({
        message: "Email is required!",
        error,
      });
    }
    if (!newPassword) {
      res.status(400).send({
        message: "New password is required!",
        error,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is wrong!",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Changed Succesfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};
