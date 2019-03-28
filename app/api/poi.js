'use strict';

const Poi = require('../models/poi');


const POI = {
  find: {
    auth: false,
    handler: async function (request, h) {
      const pois = await Poi.find().populate('category');
      return pois

    }
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const poi = await Poi.findOne({_id: request.params.id});
        if (!poi) {
          return Boom.notFound('No POI with this id');
        }
        return poi;
      } catch (err) {
        return Boom.notFound('No POI with this id');
      }

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
      const response = await Poi.deleteOne({_id: request.params.id});
      if (response.deletedCount == 1) {
        return {success: true};
      }
      return Boom.notFound('id not found');
    }
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await Poi.deleteMany({});
      return {success: true};
    }
  }


};

module.exports = POI;