import Activity from "../models/activity.model.js";
import { cloudinaryUploadCard } from "../utils/upload.js";

export const postActivities = async (req, res) => {
  const defaultIMG =
    "https://res.cloudinary.com/dtcqqdjua/image/private/s--HRdDM5FN--/v1684469511/orangecat/card/vfi7ysb8jzjqkcy1fxf5.jpg";

  if (req.file) {
    try {
      const uploadedImage = await cloudinaryUploadCard(req.file);
      console.log(uploadedImage);

      const newActivity = new Activity({
        title: req.body.title,
        date: req.body.date,
        type: req.body.type,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        duration: req.body.duration,
        task: req.body.task,
        caption: req.body.caption,
        img: uploadedImage,
        userID: req.body.userID,
      });
      console.log(`this is ${newActivity}`);

      await newActivity.save();
      return res.status(200).send("activity card created successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Creating activity card failed");
    }
  } else {
    try {
      const newActivity = new Activity({
        title: req.body.title,
        date: req.body.date,
        type: req.body.type,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        duration: req.body.duration,
        task: req.body.task,
        caption: req.body.caption,
        img: defaultIMG,
        userID: req.body.userID,
      });
      console.log(`this is ${newActivity}`);

      await newActivity.save();
      return res.status(200).send("activity card created successfully");
    } catch (err) {
      console.log(err);
      res.status(500).send("Creating activity card failed");
    }
  }
};

export const getActivity = async (req, res) => {
  const { page, limit } = req.query;
  // console.log(req.user.info._id);
  try {
    const user_ID = req.user.info._id;
    const activities = await Activity.find({ userID: user_ID })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();

    // find total document of activity
    const totalDocs = await Activity.find({ userID: user_ID }).countDocuments();

    console.log(activities);

    if (!activities) {
      return res.status(404).send("Activity not found");
    }

    return res.json({ data: activities, totalDocs: totalDocs });
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to get activity");
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    //const id = req.params.id; อันบน destructuring ที่มีค่าเท่ากับอันนี้
    //console.log(`id in delete : ${ id }`);

    const deleteActivity = await Activity.findByIdAndRemove(id);

    if (!deleteActivity) {
      return res.status(404).send("Activity not found");
    }

    res.status(200).send("Activity deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Deleting activity failed");
  }
};
