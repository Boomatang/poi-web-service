'use strict';

const Boom = require('boom');
const Poi = require('../models/poi');


const POI = {
  find: {
    auth: false,
    handler: async function (request, h) {
      const pois = await Poi.find();
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
      console.log(request.payload);
      const newPoi = new Poi(request.payload);
      const poi = await newPoi.save();
      if (poi){
        return h.response(poi).code(201);
      }
      return Boom.badImplementation("error creating poi")

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