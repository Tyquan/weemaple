const Database = {
    GetData : async (modelName, cb) =>
    {
        // await modelName.find()
        //         .then(data => data)
        //         .catch(error => error);
        let model = await modelName.find();
        cb(model);
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