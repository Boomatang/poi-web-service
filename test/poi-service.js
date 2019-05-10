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

  async deleteOnePoi(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/poi/' + id);
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

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + '/api/user', newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/user/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUserByEmail(email) {
    try {
      const response = await axios.post(this.baseUrl + '/api/user/email', email);
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + '/api/user');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/user/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/user');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async authenticate(user){
    try {
      const response = await axios.post(this.baseUrl + '/api/user/authenticate', user);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async clearAuth(user){
    axios.defaults.headers.common['Authorization'] = '';
  }
}

module.exports = PoiService;