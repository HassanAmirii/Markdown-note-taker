import User from "../models/user.models";
import { generateToken } from "../utils/token_generator.utils";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({
      username,
      email,
      password,
    });
    const token = generateToken(newUser);
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, mesage: "invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "invalid credentials" });
    }
    const token = generateToken(user);
    return res
      .status(200)
      .json({ success: true, message: "Login successful", token: token });
  } catch (error) {
    next(error);
  }
};
