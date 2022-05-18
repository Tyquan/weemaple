const express = require('express');
const Database = require('../../Config/Database');
const Article = require('../../Models/Article');
const ArticleApi = express.Router();

ArticleApi.get('/', (req, res) => {
    Database.GetData(Article, (articles, error) => {
        if (error) res.status(500).json(error);
        console.log("Articles GET:", articles)
        res.status(200).json(articles);
    });
});

ArticleApi.get('/:id', (req, res) => {
    Database.GetSingleData(Article, req.params.id, (article, error) => {
        if (error) res.status(500).json(error);
        res.status(200).json(article);
    });
});

ArticleApi.post('/', (req, res) => {
    Database.PostData(Article, req, (data, error) => {
        if (error) res.status(500).json(error);
        res.json(data);
    });
});

ArticleApi.put('/:id', (req, res) => {
    Database.UpdateData(Article, req, req.body, (data) => {
        console.log(data);
        res.json(data);
    })
});

ArticleApi.delete('/:id', (req, res) => {
    Database.DeleteData(Article, req, (data) => {
        console.log(data);
        res.json(data);
    })
});

module.exports = ArticleApi;