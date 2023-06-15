import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/auth.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name) {
      return res.send({ error: "Name is Required!" });
    }
    if (!email) {
      return res.send({ error: "E-mail is Required!" });
    }
    if (!password) {
      return res.send({ error: "Password is Required!" });
    }
    if (!phone) {
      return res.send({ error: "Phone is Required!" });
    }

    const exisitingUser = await userModel.findOne({ email });

    if (exisitingUser) {
      return res.status(200).send({
        success: true,
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
      message: "User Register Successfully!",
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
      message: "Login Succesfully!",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login failed!",
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
