const mongoose = require('mongoose');

const Database = {
    GetData : (modelName, res) =>
    {
        // modelName.find().then((data) => {
        //     console.log("Gigs GET:", data)
        //     res.status(200).json(data);
        // }).catch((err) => {
        //     res.status(500).json(err);
        // });
        // await modelName.find()
        //         .then(data => data)
        //         .catch(error => error);
        // modelName.find((results) => {
        //     cb(results);
        // })
        // modelName.find().then((models) => {
        //     cb(models);
        // });
        
    },

    getLatestData: async (modelName, limitNumber, cb) => {
        let model = await modelName.find().limit(limitNumber);
        cb(model)
    },

    GetSingleData : async (modelName, dataId, cb) =>
    {
        let model = await modelName.findById(dataId);
        cb(model);
    },

    PostData : async (modelName, req, cb) =>
    {
        let model = new modelName(req.body);
        await model.save()
            .then(data => cb(data))
            .catch(error => cb(error));
    },

    UpdateData : async (modelName, req, updatedDataBody, cb) => 
    {
        modelName.findByIdAndUpdate(req.params.id, updatedDataBody, (data) => {
            cb(data);
        });
    },

    DeleteData : async (modelName, req, cb) =>
    {
        modelName.findByIdAndDelete(req.params.id, () => {
            cb("Deleted");
        });
    }
};

module.exports = Database;