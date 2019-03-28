'use strict';

const Accounts = require('./app/api/accounts');
const POI = require('./app/api/poi');

module.exports = [
  { method: 'GET', path: '/', config: Accounts.index},

  {method: 'GET', path: '/api/poi', config: POI.find},
  {method: 'GET', path: '/api/poi/{id}', config: POI.findOne},
  {method: 'POST', path: '/api/poi', config: POI.create},
  {method: 'DELETE', path: '/api/poi/{id}', config: POI.deleteOne},
  {method: 'DELETE', path: '/api/poi', config: POI.deleteAll},
];