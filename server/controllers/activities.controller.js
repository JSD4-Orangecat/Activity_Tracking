import Activity from "../models/activity.model.js";

export const postActivities = async (req, res) => {

    try {
        const newActivity =  new Activity ({
            title: req.body.title,
            date: req.body.date,
            type: req.body.type,
            timeStart: req.body.timeStart,
            timeEnd: req.body.timeEnd,
            duration: req.body.duration,
            caption: req.body.caption,
            img: req.body.img,
            userID: req.body.userID
        });
        console.log(`this is ${newActivity}`);

        await newActivity.save();
        return res.status(200).send('activity card created successfully');

    } catch (err) {
        console.log(err);
        res.status(500).send('Creating activity card failed'); 
    }

};