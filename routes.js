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


  {method: 'GET', path: '/api/user', config: Accounts.find},
  {method: 'GET', path: '/api/user/current', config: Accounts.findCurrent},
  {method: 'GET', path: '/api/user/{id}', config: Accounts.findOne},
  {method: 'POST', path: '/api/user/email', config: Accounts.findByEmail},
  {method: 'POST', path: '/api/user', config: Accounts.create},
  {method: 'PUT', path: '/api/user', config: Accounts.update},
  {method: 'DELETE', path: '/api/user', config: Accounts.deleteAll},
  {method: 'DELETE', path: '/api/user/{id}', config: Accounts.deleteOne},

  {method: 'POST', path: '/api/user/authenticate', config: Accounts.authenticate}

];