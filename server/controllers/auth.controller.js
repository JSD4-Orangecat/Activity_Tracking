import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cloudinaryUploadProfile } from "../utils/upload.js";

export const register = async (req, res) => {
  const height = Number(req.body.height);
  const weight = Number(req.body.weight);
  try {
    const uploadedImage = await cloudinaryUploadProfile(req.file);
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
      weight: weight,
      height: height,
      picture: uploadedImage,
    });
    console.log({ user });
    await user.save();
    res.status(201).send({ message: "Create user successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Wrong password or email meow!",
      });
    }
    // if(req.body.password === user.password)
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Wrong password or email meow!",
      });
    }

    const { password, birthDate, gender, ...info } = user._doc;

    console.log(info);

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
  if (req.file) {
    try {
      // console.log(req.body)
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

      //upload picture profile
      const uploadedImage = await cloudinaryUploadProfile(req.file);
      // Update other profile fields
      account.password = req.body.password;
      account.email = email || account.email;
      account.firstName = req.body.firstName || account.firstName;
      account.lastName = req.body.lastName || account.lastName;
      account.birthDate = req.body.birthDate || account.birthDate;
      account.gender = req.body.gender || account.gender;
      account.picture = uploadedImage || account.picture;
      account.weight = req.body.weight || account.weight;
      account.height = req.body.height || account.height;

      await account.save();

      res.status(200).send({ message: "Profile updated successfully" });
    } catch (err) {
      res
        .status(500)
        .send({ message: err.message + "Failed to update user account" });
    }
  } else {
    try {
      // console.log(req.body)
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

      // Update other profile fields
      account.password = req.body.password;
      account.email = email || account.email;
      account.firstName = req.body.firstName || account.firstName;
      account.lastName = req.body.lastName || account.lastName;
      account.birthDate = req.body.birthDate || account.birthDate;
      account.gender = req.body.gender || account.gender;
      account.picture = account.picture;
      account.weight = req.body.weight || account.weight;
      account.height = req.body.height || account.height;

      await account.save();

      res.status(200).send({ message: "Profile updated successfully" });
    } catch (err) {
      res
        .status(500)
        .send({ message: err.message + "Failed to update user account" });
    }
  }
};
