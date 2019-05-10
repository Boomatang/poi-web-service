'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Users API tests', function() {
  let users = fixtures.USER;
  let newUser = fixtures.newUser;

  const poiService = new PoiService(fixtures.poiService);

  suiteSetup(async function(){
    await poiService.deleteAllUsers();
    const returnedUser = await poiService.createUser(newUser);
    const response = await poiService.authenticate(newUser);
  });

  suiteTeardown(async function () {
    await poiService.deleteAllUsers();
    await poiService.clearAuth();
  });


  test('create a user', async function() {
    const returnedUser = await poiService.createUser(newUser);
    assert(_.some([returnedUser], newUser), 'returnedUser must be a superset of newUser');
    assert.isDefined(returnedUser._id);
  });

  test('get user', async function() {
    const u1 = await poiService.createUser(newUser);
    const u2 = await poiService.getUser(u1._id);
    assert.deepEqual(u1, u2);
  });

  test('get user by email', async function() {
    await poiService.deleteAllUsers();
    const u1 = await poiService.createUser(newUser);
    const u2 = await poiService.getUserByEmail({email: u1.email});
    assert.deepEqual(u1, u2);
  });

  test('get invalid user', async function() {
    const u1 = await poiService.getUser('1234');
    assert.isNull(u1);
    const u2 = await poiService.getUser('012345678901234567890123');
    assert.isNull(u2);
  });

  test('delete a user', async function() {
    let u = await poiService.createUser(newUser);
    assert(u._id != null, "No id");
    await poiService.deleteOneUser(u._id);
    u = await poiService.getUser(u._id);
    console.log(u);
    assert(u == null, "User not null");

  });

  test('get all user', async function() {
    await poiService.deleteAllUsers();
    await poiService.createUser(newUser);
    await poiService.authenticate(newUser);
    for (let u of users) {
      await poiService.createUser(u);
    }

    const allUsers = await poiService.getUsers();
    assert.equal(allUsers.length, users.length + 1);
  });

  test('get user detail', async function() {
    await poiService.deleteAllUsers();
    const user = await poiService.createUser(newUser);
    await poiService.authenticate(newUser);
    for (let u of users) {
      await poiService.createUser(u);
    }

    const testUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    };

    users.unshift(testUser);

    const allUsers = await poiService.getUsers();
    for (var i = 0; i < users.length; i++) {
      assert(_.some([allUsers[i]], users[i]), 'returnedPoi must be a superset of newUser');
    }
  });

  test('get all users empty', async function() {
    await poiService.deleteAllUsers();
    const user = await poiService.createUser(newUser);
    await poiService.authenticate(user);
    const allUsers = await poiService.getUsers();
    assert.equal(allUsers.length, 1);
  });

});