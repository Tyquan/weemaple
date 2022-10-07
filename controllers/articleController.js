const Database = require('../config/Database');
const Article = require('../models/Article');

const getArticles = (req, res) => {
    Database.GetData(Article, (articles, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(articles);
    });
}

const getSingleArticle = (req, res) => {
    Database.GetSingleData(Article, req.params.id, (article, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(article);
    });
};

const createNewArticle = (req, res) => {
    Database.PostData(Article, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
}

const updateArticle = (req, res) => {
    Database.UpdateData(Article, req, (error, data) => {
        if (error) res.status(500).json(error);
        res.json(data);
    })
}

const deleteArticle = (req, res) => {
    Database.DeleteData(Article, req, (error, data) => {
        if (error) res.status(500).json(error);
        res.json(data);
    })
}

module.exports = {
    getArticles,
    getSingleArticle,
    createNewArticle,
    updateArticle,
    deleteArticle
};