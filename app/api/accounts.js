'use strict';

const Boom = require('boom');
const User = require('../models/user');
const utils = require('./utils');


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
    auth: {
      strategy: 'jwt'
    },
    handler: async function (request, h) {
      const users = await User.find();
      return users

    }
  },

  findOne: {
    auth: {
      strategy: 'jwt'
    },
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

  findCurrent: {
    auth: {
      strategy: 'jwt'
    },
    handler: async function (request, h) {
      const userId = utils.getUserIdFromRequest(request);
      // console.log(userId);
      const user = await User.findOne({_id: userId});
      // console.log(user);
      return user

    }
  },

  update: {
    auth: {
      strategy: 'jwt'
    },
    handler: async function (request, h) {
      console.log(request.payload);

      const userId = utils.getUserIdFromRequest(request);
      console.log(userId);

      const remoteUser = request.payload;

      const currentUser = await User.findById(userId);

      currentUser.firstName = remoteUser.firstName;
      currentUser.lastName = remoteUser.lastName;
      currentUser.email = remoteUser.email;
      currentUser.password = remoteUser.password;

      const user = await currentUser.save();
      if (user){
        return h.response(user).code(201);
      }
      return Boom.badImplementation("error updating user")

    }
  },


  deleteOne: {
    auth: {
      strategy: 'jwt'
    },
    handler: async function (request, h) {
      const response = await User.deleteOne({_id: request.params.id});
      if (response.deletedCount == 1) {
        return {success: true};
      }
      return Boom.notFound('id not found');
    }
  },

  deleteAll: {
    auth: {
      strategy: 'jwt'
    },
    handler: async function (request, h) {
      await User.deleteMany({});
      return {success: true};
    }
  },

  authenticate: {
    auth: false,
    handler: async function(request, h){

      try{
        const user = await User.findOne({email: request.payload.email});
        if(!user){
          return Boom.notFound("Authentication failed. User not found");
        }
        const token = utils.createToken(user);
        return h.response({success: true, token: token}).code(201);
      } catch (err) {
        return Boom.notFound('internal db failure');
      }
    }
  }

};

module.exports = Accounts;