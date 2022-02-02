const mongoose = require("mongoose");

const VideoSchema = mongoose.Schema({
    title: {
        type: String
    },
    contentType: {
        type: String
    },
    subTitle: {
        type: String
    },
    views: {
        type: Number
    },
    body: {
        type: String
    },
    images: [{
        link: {
            type: String
        }
    }],
    mainImage: {
        type: String
    },
    videoUrl: {
        type: String
    },
    userId: {
        type: String
    },
    creationDate: Date,
    modifiedDate: Date
}, {strict: false});

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;