const express = require('express');
const Database = require('../../Config/Database');
const Video = require('../../Models/Video');
const VideoApi = express.Router();

VideoApi.get('/', (req, res) => {
    Database.GetData(Video, (Videos, error) => {
        if (error) res.status(500).json(error);
        console.log("Videos GET:", Videos)
        res.status(200).json(Videos);
    });
});

VideoApi.get('/:id', (req, res) => {
    Database.GetSingleData(Video, req.params.id, (Video, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(Video);
    });
});

VideoApi.post('/', (req, res) => {
    Database.PostData(Video, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
});

VideoApi.put('/:id', (req, res) => {
    Database.UpdateData(Video, req, req.body, (data) => {
        console.log(data);
        res.json(data);
    })
});

VideoApi.delete('/:id', (req, res) => {
    Database.DeleteData(Video, req, (data) => {
        console.log(data);
        res.json(data);
    })
});

module.exports = VideoApi;