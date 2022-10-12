const express = require('express');
const articleApi = express.Router();
const articleController = require('../controllers/articleController');
const ROLES_LIST = require('../Config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

articleApi.route('/')
    .get(articleController.getArticles)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), articleController.createNewArticle)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), articleController.updateArticle)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.Employee, ROLES_LIST.User), articleController.deleteArticle);
articleApi.route('/:id')
    .get(articleController.getSingleArticle);

module.exports = articleApi;