'use strict';

const Hapi = require('hapi');
const dotenv = require('dotenv');
require('./app/models/db');

const result = dotenv.config();
if(result.error){
  console.log(result.error.message);
  process.exit(1);
}

const server = Hapi.server({
  port: process.env.PORT || 3000,
  routes: { cors:true}
});


async function init() {
  await server.register(require('hapi-auth-cookie'));

  server.auth.strategy('standard', 'cookie', {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
      isSecure: false
    },

    // ttl: 24*60*60*1000,
    redirectTo: '/'
  });

  server.auth.default({
    mode: 'required',
    strategy: 'standard'
  });

  server.route(require('./routes'));
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
