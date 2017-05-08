/**
 * @name hello-v1-api
 * @description This module packages the Hello API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = hydra.getServerResponseHelper();
let serverResponse = new ServerResponse();

let api = express.Router();

api.get('/', (req, res) => {
  serverResponse.sendOk(res, {
    result: {
      msg: `hello from ${hydra.getServiceName()} - ${hydra.getInstanceID()}`
    }
  });
});

// example of using res.json to return a response
api.get('/test', (req, res) => {
  res.json({
    result: {
      msg: `hello from ${hydra.getServiceName()} - ${hydra.getInstanceID()}`
    }
  });
});

api.get('/test2', (req, res) => {
  serverResponse.sendOk(res, {
    result: {
      msg: `hello from ${hydra.getServiceName()} - ${hydra.getInstanceID()}`
    }
  });
});

api.get('/html', (req, res) => {
  res.writeHead(ServerResponse.HTTP_OK, {
    'Content-Type': 'text/html'
  });
  res.write(`
    <html>
    <body>
      <h1>Hello!!</h1>
    </body>
    </html>
  `);
  res.end();
});

api.get('/image', (req, res) => {
  let segments = __dirname.split('/'); // Note: change '/' on machines running Windows.
  segments.pop();
  let path = segments.join('/');
  res.sendFile(`${path}/hydra.png`);
});

api.post('/post', (req, res) => {
  res.json({
    result: {
      msg: 'Post recieved',
      a: req.body.a,
      b: req.body.b
    }
  });
});

api.get('/slow', (req, res) => {
  setTimeout(() => {
    res.json({
      result: {
        msg: 'Post recieved',
        a: req.body.a,
        b: req.body.b
      }
    });
  }, 30000);
});

module.exports = api;
