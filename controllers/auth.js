import userSchema from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { SECRET_KEY, SALT_VALUE } = process.env;
export const register = async (req, res) => {
  //   console.log(req.body);
  const { username, email, password, isAdmin } = req.body;
  const finduser = await userSchema.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (finduser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const salt = bcrypt.genSaltSync(SALT_VALUE);
  const hashpassword = bcrypt.hashSync(password, salt);

  const user = new userSchema({
    username,
    email,
    password: hashpassword,
    isAdmin,
  });
  const savedUser = await user.save();
  res.status(200).json({ message: "User created successfully" });
};

export const login = async (req, res) => {
  //   console.log(req.body);
  const { username, password } = req.body;

  const finduser = await userSchema.findOne({
    $or: [{ username: username }, { email: username }],
  });
  console.log(finduser);
  if (finduser) {
    const isMatch = bcrypt.compareSync(password, finduser.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          id: finduser._id,
          username: finduser.username,
          isAdmin: finduser.isAdmin,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      res
        .cookie("token", token, { httpOnly: true, secure: "production" })
        .status(200)
        .json({ message: "Login Successful", token });
    } else {
      res.status(400).json({ message: "Invalid Password" });
    }
  } else {
    res.status(400).json({ message: "User not found" });
  }
};
