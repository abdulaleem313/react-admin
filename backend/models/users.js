
// let Joi = require('joi')
// let bcrypt = require('bcrypt')
let RestHapi = require('rest-hapi')


module.exports = function (mongoose) {
    let modelName = "user"
    let Types = mongoose.Schema.Types
    let Schema = new mongoose.Schema({
        email: {
          type: Types.String,
          required: true,
          unique: true
        },
        password: {
          type: Types.String,
          required: true,
          exclude: true,
          allowOnUpdate: false
        }
    });

    Schema.statics = {
        collectionName: 'users',
        routeOptions: {}
    };

    return Schema;
};