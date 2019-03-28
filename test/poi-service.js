'use strict';

const axios = require('axios');

class PoiService {
  constructor(baseUrl){
    this.baseUrl = baseUrl;
  }

  async getPois() {
    try {
      const response = await axios.get(this.baseUrl + '/api/poi');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getPoi(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/poi/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createPoi(newPoi) {
    try {
      const response = await axios.post(this.baseUrl + '/api/poi', newPoi);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllPois() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/poi');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOnePoi(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/poi/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
}

module.exports = PoiService;