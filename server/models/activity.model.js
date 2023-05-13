import mongoose from "mongoose";
const { Schema } = mongoose;

//Define Schema
const ActivitySchema = new Schema({
    activityID: {
        type: 'string',
        required: true,
    },
    title: {
        type: 'string',
        required: true,
    },
    date: {
        type: 'string',
        required: true,
    },
    type: {
        type: 'string',
        required: true,
    },
    timeStart: {
        type: 'string',
        required: true,
    },
    timeEnd: {
        type: 'string',
        required: true,
    },
    duration: {
        type: 'string',
        required: true
    },
    caption: {
        type: 'string',
        required: true
    },
    img: {
        type: 'string',
        required: false
    },
    },
    {
        timestamps: true,
    }
);

export default  mongoose.model('Activity', ActivitySchema);