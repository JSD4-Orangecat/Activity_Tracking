import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//   // เข้ารหัส password ด้วย bcrypt
//   const salt = await bcrypt.genSalt(10);
//   const userPassword = await bcrypt.hash(req.body.password, salt);
//   try {
//     const newUser = new User({
//       ...req.body,
//       password: userPassword,
//     });

//     await newUser.save();
//     return res.status(200).json({
//       message: "User has been created successfully",
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Something went wrong!");
//   }
// };

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send("User not found");
    }
    // if(req.body.password === user.password)
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Wrong password or username!",
      });
    }

    const { password, ...info } = user._doc;

    const token = jwt.sign({ info }, process.env.SECRET_KEY, {
      expiresIn: "3600000",
    });

    return res.json({ message: "login successfully", token });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};
