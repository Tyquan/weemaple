const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RolePermissionSchema = Schema({
    roleId: {type: String},
    permissionId: {type: String},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date}
});
module.exports = mongoose.model("RolePermission", RolePermissionSchema);;