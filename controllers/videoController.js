const Database = require('../config/Database');
const Video = require('../models/Video');

const getVideos = (req, res) => {
    Database.GetData(Video, (err, videos) => {
        if (err) res.status(500).json(err);
        res.status(200).json(videos);
    });
};

const getSingleVideo = (req, res) => {
    Database.GetSingleData(Video, req.params.id, (err, video) => {
        if (err) res.status(500).json(err);
        res.status(200).json(video);
    })
};

const createNewVideo = (req, res) => {
    Database.PostData(Video, req, (err, video) => {
        if (err) res.status(500).json(err);
        res.status(200).json(video);
    })
};

const updateVideo = (req, res) => {
    Database.UpdateData(Video, req, (err, video) => {
        if (err) res.status(500).json(err);
        res.status(200).json(video);
    })
};

const deleteVideo = (req, res) => {
    Database.DeleteData(Video, req, (err, video) => {
        if (err) res.status(500).json(err);
        res.status(200).json(video)
    })
};


module.exports = {
    getVideos,
    getSingleVideo,
    createNewVideo,
    updateVideo,
    deleteVideo
}