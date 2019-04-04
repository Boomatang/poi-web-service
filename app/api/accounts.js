'use strict';

const Boom = require('boom');
const User = require('../models/user');

const Accounts = {
  index: {
    auth: false,
    handler: function (request, h) {
      return "Hello world"

    }
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      console.log(request.payload);
      const newUser = new User(request.payload);
      const user = await newUser.save();
      if (user){
        return h.response(user).code(201);
      }
      return Boom.badImplementation("error creating user")

    }
  },

  find: {
    auth: false,
    handler: async function (request, h) {
      const users = await User.find();
      return users

    }
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await User.findOne({_id: request.params.id});
        if (!user) {
          return Boom.notFound('No User with this id');
        }
        return user;
      } catch (err) {
        return Boom.notFound('No User with this id');
      }

    }
  },

  findByEmail: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await User.findByEmail(request.payload.email);
        if (!user) {
          return Boom.notFound('No User with this email');
        }
        return user;
      } catch (err) {
        return Boom.notFound('No User with this email');
      }

    }
  },
  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      const response = await User.deleteOne({_id: request.params.id});
      if (response.deletedCount == 1) {
        return {success: true};
      }
      return Boom.notFound('id not found');
    }
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await User.deleteMany({});
      return {success: true};
    }
  }

};

module.exports = Accounts;