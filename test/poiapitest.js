'use strict';

const assert = require('chai').assert;
const PoiService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('POI API tests', function() {
  let pois = fixtures.POI;
  let newPoi = fixtures.newPoi;

  const poiService = new PoiService(fixtures.poiService);

  setup(async function(){
    await poiService.deleteAllPois();
  });

  teardown(async function(){
    await poiService.deleteAllPois();
  });

  test('create a poi', async function() {
    const returnedPoi = await poiService.createPoi(newPoi);
    assert(_.some([returnedPoi], newPoi), 'returnedPoi must be a superset of newPoi');
    assert.isDefined(returnedPoi._id);
  });

  test('get poi', async function() {
    const p1 = await poiService.createPoi(newPoi);
    const p2 = await poiService.getPoi(p1._id);
    assert.deepEqual(p1, p2);
  });

  test('get invalid poi', async function() {
    const p1 = await poiService.getPoi('1234');
    assert.isNull(p1);
    const p2 = await poiService.getPoi('012345678901234567890123');
    assert.isNull(p2);
  });

  test('delete a poi', async function() {
    let p = await poiService.createPoi(newPoi);
    assert(p._id != null, "No id");
    await poiService.deleteOnePoi(p._id);
    p = await poiService.getPoi(p._id);
    console.log(p);
    assert(p == null, "poi not null");

  });

  test('get all poi', async function() {
    for (let p of pois) {
      let b = await poiService.createPoi(p);
    }

    const allPois = await poiService.getPois();
    assert.equal(allPois.length, pois.length);
  });

  test('get poi detail', async function() {
    for (let p of pois) {
      await poiService.createPoi(p);
    }

    const allPois = await poiService.getPois();
    for (var i = 0; i < pois.length; i++) {
      assert(_.some([allPois[i]], pois[i]), 'returnedPoi must be a superset of newPoi');
    }
  });

  test('get all poi empty', async function() {
    const allPois = await poiService.getPois();
    assert.equal(allPois.length, 0);
  });

});