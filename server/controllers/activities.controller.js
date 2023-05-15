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

export const getActivity = async (req, res) => {
    console.log(req.params);

    try {
        const { activityID } = req.params; 
        const activity = await Activity.findOne({ activityID });

        if (!activity) {
            return res.status(404).send('Activity not found');
        }

        //activityID is a destructured variable in the code, it cannot be used as a property name in the same object.
        //destructured activityID is renamed to  using the syntax 'activityID:'  
        const { activityID: _ , _id, ...responsData } = activity._doc;
        console.log(responsData);

        res.status(200).json(responsData); 

    } catch (err) {
        console.log(err);
        res.status(500).send('Failed to get activity');
    }
};