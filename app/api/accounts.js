'use strict';

const Accounts = {
  index: {
    auth: false,
    handler: function (request, h) {
      return "Hello world"

    }
  }
};

module.exports = Accounts;