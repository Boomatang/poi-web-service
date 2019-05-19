'use strict';
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret = 'secretpasswordnotrevealedtoanyone';

exports.createToken = function (user) {
  return jwt.sign(
    {id: user._id, email: user.email},
    secret,
    {algorithm: 'HS256',
    expiresIn: '1h'}
    );
};

exports.decodeToken = function (token) {
  var userInfo = {};
  try {
    var decoded = jwt.verify(token, secret);
    userInfo.userId = decoded.id;
    userInfo.email = decoded.email;
  } catch (e) {

  }
  return userInfo
};

exports.validate = async function(decoded, request){
  const user = await User.findOne({_id: decoded.id});
  if(!user){
    return {isValid: false};
  } else {
    return {isValid: true};
  }
};

exports.getUserIdFromRequest = function(request) {
  var userId = null;
  try {
    const authorization = request.headers.authorization;
    var token = authorization.split(' ')[1];
    console.log(token);
    var decodedToken = jwt.verify(token, secret);
    userId = decodedToken.id

  } catch (e) {
    userId = null;
  }
  return userId;
};

exports.getCurrentDateTimeString = function () {
  const currentDate = new Date();
  const datetime = currentDate.getDate() + "/"
    + (currentDate.getMonth() + 1) + "/"
    + currentDate.getFullYear() + " @ "
    + currentDate.getHours() + ":"
    + currentDate.getMinutes();

  return datetime
};

exports.getUserFullName = async function (request) {
  const userId = this.getUserIdFromRequest(request);
  const user = await User.findOne({_id: userId});

  if(user){
    return `${user.firstName} ${user.lastName}`;
  } else {
    return undefined;
  }
};