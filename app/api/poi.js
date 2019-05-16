'use strict';

const Boom = require('boom');
const Poi = require('../models/poi');
const Utils = require('./utils');


const POI = {
  find: {
    auth: {
      strategy: 'jwt'
    },
    handler: async function (request, h) {
      const pois = await Poi.find();
      return pois

    }
  },

  findOne: {
    auth: {
        strategy: 'jwt'
      },
    // auth: false,
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
    auth: {
      strategy: 'jwt'
    },
    handler: async function (request, h) {
      const newPoi = new Poi(request.payload);
      const poi = await newPoi.save();
      if (poi){
        return h.response(poi).code(201);
      }
      return Boom.badImplementation("error creating poi")

    }
  },
  update: {
    auth: {
      strategy: 'jwt'
    },
    handler: async function (request, h) {
      const poiId = request.payload._id;
      const updatePoi = request.payload;

      const systemPoi = await Poi.findOne({_id: poiId});

      systemPoi.name = updatePoi.name;
      systemPoi.description = updatePoi.description;
      systemPoi.geo.lat = updatePoi.geo.lat;
      systemPoi.geo.long = updatePoi.geo.long;

      const poi = await systemPoi.save();
      if (poi){
        return h.response(poi).code(201);
      }
      return Boom.badImplementation("error error poi")

    }
  },
  deleteOne: {
    auth: {
      strategy: 'jwt'
    },
    handler: async function (request, h) {
      const response = await Poi.deleteOne({_id: request.params.id});
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
      await Poi.deleteMany({});
      return {success: true};
    }
  },

  createComment: {
    auth: {
      strategy: 'jwt'
    },
    // auth: false,

    handler: async function (request, h) {

      try {
        const poi = await Poi.findOne({_id: request.params.id});
        const comment = request.payload;
        comment.date = Utils.getCurrentDateTimeString();

        await poi.comments.push(comment);

        return h.response(poi).code(201);


      } catch (e) {
        // console.log(e);
        return Boom.notFound('Comment Not Created')
      }
    }
  }

};

module.exports = POI;