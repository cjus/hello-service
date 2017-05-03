/**
* @name Hello
* @summary Hello Hydra Express service entry point
* @description says hello
*/
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();

/**
* Load configuration file and initialize hydraExpress app.
*/
hydraExpress.init(`${__dirname}/config/config.json`, () => {
  hydraExpress.registerRoutes({
    '/v1/hello': require('./routes/hello-v1-routes')
  });
})
  .then((serviceInfo) => {
    let logEntry = `Started ${hydra.getServiceName()} (v.${hydra.getInstanceVersion()})`;
    console.log(logEntry);
    console.log(serviceInfo);
  })
  .catch((err) => {
    console.log('err', err);
  });
