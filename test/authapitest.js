'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const utils = require('../app/api/utils');

suite('Auth API tests', function () {

  let users = fixtures.USER;
  let newUser = fixtures.newUser;

  const poiService = new PoiService(fixtures.poiService);

  setup(async function () {
    await poiService.deleteAllUsers();
  });

  test('authenticate', async function () {

    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(returnedUser);
    assert(response.success);
    assert.isDefined(response.token);

  });

  test('verify Token', async function(){
    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(newUser);
    console.log(response.token);
    const userInfo = utils.decodeToken(response.token);
    console.log(userInfo);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);

  })

});