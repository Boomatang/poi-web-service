'use strict';

const Poi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      return "home world"

    }
  },
  findOne: {
    auth: false,
    handler: async function (request, h) {
      return "create world"

    }
  },
  create: {
    auth: false,
    handler: async function (request, h) {
      return "view world"

    }
  },
  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      return "delete world"

    }
  },
  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      return "delete world"

    }
  }


};

module.exports = Poi;