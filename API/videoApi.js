const express = require('express');
const VideoApi = express.Router();
const videoController = require('../controllers/videoController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

VideoApi.route('/')
    .get(videoController.getVideos)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), videoController.createNewVideo)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), videoController.updateVideo)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), videoController.deleteVideo);

VideoApi.route('/:id')
    .get(videoController.getSingleVideo);

module.exports = VideoApi;