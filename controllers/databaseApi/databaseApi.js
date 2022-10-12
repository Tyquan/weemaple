const mongoose = require('mongoose');

module.exports = {
    GetData : async (modelName, cb) =>
    {
        await modelName.find()
            .then((data) => {
                cb(data)
            }).catch((err) => {
                cb(err);
            });
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

    UpdateData : async (modelName, req, cb) => 
    {
        await modelName.findByIdAndUpdate(req.params.id, req.body, (data) => {
            cb(data);
        });
    },

    DeleteData : async (modelName, req, cb) =>
    {
        await modelName.findByIdAndDelete(req.params.id, () => {
            cb("Deleted");
        });
    }
};