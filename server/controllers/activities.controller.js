import Activity from "../models/activity.model.js";

export const postActivities = async (req, res) => {
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
      img: req.body.img,
      userID: req.body.userID,
    });
    console.log(`this is ${newActivity}`);

    await newActivity.save();
    return res.status(200).send("activity card created successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Creating activity card failed");
  }
};

export const getActivity = async (req, res) => {
  // console.log(req.user.info._id);
  try {
    const user_ID = req.user.info._id;
    const activities = await Activity.find({ userID: user_ID });
    // console.log(activities);

    if (!activities) {
      return res.status(404).send("Activity not found");
    }

    return res.json({ data: activities });
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to get activity");
  }
};

export const deleteActivity = async (req, res) => {

  try {
    const { _id } = req.body;
    const deleteActivity = await Activity.findByIdAndRemove( _id);
    
      if(!deleteActivity) {
          return res.status(404).send('Activity not found');
      }

      res.status(200).send('Activity deleted successfully');

  } catch (err) {
      console.log(err);
      res.status(500).send('Deleting activity failed');
  }

};
