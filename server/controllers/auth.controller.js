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

export const register = async (req, res) => {
  try {
    // console.log(req.body)
    const { email, password } = req.body;

    // Check that email must be unique
    const isUniqueEmail = await User.findOne({ email });
    if (isUniqueEmail) {
      return res.status(400).send({ message: "This email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send({ message: "Create user succesfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

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
// delete user account
export const deleteUserAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    // assign req.user to variable userid
    const userid = req.user.info._id;
    // Find the user by ID and delete
    const deleteAccount = await User.findByIdAndRemove({ _id: userid });

    // // Check account for deleting

    if (!deleteAccount) {
      return res.status(404).send({ message: "There is no this account" });
    }
    res.status(200).send({ message: "User account deleted" });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message + "Failed to delete user account" });
  }
};

export const getUser = async (req, res, next) => {
  try {
    // assign req.user to variable userid
    const userid = req.user.info._id;
    // Find the user by ID
    const account = await User.findById({ _id: userid });

    // Check account exists
    if (!account) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.json({ data: account });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message + "Failed to get user account" });
  }
};

// Edit profile
export const editProfile = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // assign req.user to variable userid
    const userid = req.user.info._id;
    // Find the user by ID
    const account = await User.findById({ _id: userid });

    // Check if the user exists
    if (!account) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if the email is already registered by another user
    if (email !== account.email) {
      //find user email in database
      const isUniqueEmail = await User.findOne({ email });
      //if find email in database and found response
      if (isUniqueEmail) {
        return res
          .status(400)
          .send({ message: "This email is already registered" });
      }
    }
    // Update the user's password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      account.password = hashedPassword;
    }
    // Update other profile fields
    account.email = email || account.email;
    account.firstName = req.body.firstName || account.firstName;
    account.lastName = req.body.lastName || account.lastName;
    account.birthDate = req.body.birthDate || account.birthDate;
    account.gender = req.body.gender || account.gender;
    account.picture = req.body.picture || account.picture;
    account.weight = req.body.weight || account.weight;
    account.height = req.body.height || account.height;

    await account.save();

    res.status(200).send({ message: "Profile updated successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: err.message + "Failed to update user account" });
  }
};
