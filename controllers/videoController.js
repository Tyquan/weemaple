const databaseApi = require('./databaseApi/databaseApi');
const Video = require('../models/Video');

const getVideos = (req, res) => {
    databaseApi.GetData(Video, (err, videos) => {
        if (err) res.status(500).json(err);
        res.status(200).json(videos);
    });
};

const getSingleVideo = (req, res) => {
    databaseApi.GetSingleData(Video, req.params.id, (err, video) => {
        if (err) res.status(500).json(err);
        res.status(200).json(video);
    })
};

const createNewVideo = (req, res) => {
    databaseApi.PostData(Video, req, (err, video) => {
        if (err) res.status(500).json(err);
        res.status(200).json(video);
    })
};

const updateVideo = (req, res) => {
    databaseApi.UpdateData(Video, req, (err, video) => {
        if (err) res.status(500).json(err);
        res.status(200).json(video);
    })
};

const deleteVideo = (req, res) => {
    databaseApi.DeleteData(Video, req, (err, video) => {
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