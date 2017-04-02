/**
 * @name hello-v1-api
 * @description This module packages the Hello API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');

let serverResponse = new ServerResponse();

let api = express.Router();

api.get('/', (req, res) => {
  serverResponse.sendOk(res, {
    result: {}
  });
});

api.get('/test', (req, res) => {
  serverResponse.sendOk(res, {
    result: {
      msg: `hello from ${hydra.getServiceName()} - ${hydra.getInstanceID()}`
    }
  });
});

api.get('/test2', (req, res) => {
  res.json({
    result: {
      msg: `hello from ${hydra.getServiceName()} - ${hydra.getInstanceID()}`
    }
  });
});

module.exports = api;
