# hello-service

This project contains an example HydraExpress microservice which displays a hello message and the ID of the microservice. This is useful when running multiple instances of this service and seeing hydra load balancing in affect. Multiple requests will serve from different instances.

```
http://localhost:5000/v1/hello/test
```

Returns:

```javascript
{
  "statusCode": 200,
  "statusMessage": "OK",
  "statusDescription": "Request succeeded without error",
  "result": {
    "msg": "hello from hello-service - 5ac3a3453e9bac1f69dc2c02a765e014"
  }
}
```

## Configuration

This service expects a local instance of Redis. To change the location of Redis update the `config/config.json` file:

```shell
{
  "environment": "development",
  "hydra": {
    "serviceName": "hello-service",
    "serviceIP": "",
    "servicePort": 5000,
    "serviceType": "hello",
    "serviceDescription": "says hello",
    "redis": {
      "url": "redis://127.0.0.1:6379/15"
    }
  }
}
```

## Pre-installation

It's recommended that you use [NVM](https://github.com/creationix/nvm) be used to manage NodeJS versions. The project includes a .nvmrc file which specifies NodeJS 6.2.1 - but you can update that to a newer version.

Again, you don't need to use NVM it's just recommended. ;-)

## Installation

```javascript
$ npm install
```

## Running

```shell
$ npm start
```

## Using in a Docker container

To build as a container:

```shell
$ docker build --no-cache=true -t cjus/hello-service:0.0.7 .
```

> Don't forget the trailing period above.

When using as a docker container you need to update the service's config file since the running container will have a different IP address from your host. So Redis won't be found inside the container!

There are a few ways to address this concern.  The first method is to simply build the container with the hardcoded config entry for your Redis server.

Another option is to specify a DNS entry in your config file which maps to your Redis server. See the `redislocation` entry below.

```shell
{
  "environment": "development",
  "hydra": {
    "serviceName": "hello-service",
    "serviceIP": "",
    "servicePort": 5000,
    "serviceType": "hello",
    "serviceDescription": "says hello",
    "redis": {
      "url": "redis://redislocation:6379/15"
    }
  }
}
```

Next rebuild the container with the config above and then you can later run it using:

```shell
$ docker run -it -d -p 5000:5000 \
  --name hello-service \
  --add-host redislocation:192.168.1.186 \
  --workdir=/usr/src/app \
  cjus/hello-service:0.0.7
```

You can then test access the container's service using:

```shell
$ curl localhost:5000/v1/hello/test
{"statusCode":200,"statusMessage":"OK","statusDescription":"Request succeeded without error","result":{"msg":"hello from hello-service - da3a2e99becc03abed949080d8fa3185"}}
```

Yet, another method is to run the container with a mapped volume. In the example, the local project folder `~/dev/hello-service/config` maps over the container's built-in `/usr/src/app/config` folder.  So the running container will use the config file you specified in your project folder. That allows you to leave the config.json file in the container and override it with one outside the container.

```shell
$ docker run -it -d -p 5000:5000 \
  --name hello-service \
  --workdir=/usr/src/app \
  -v ~/dev/hello-service/config:/usr/src/app/config \
  cjus/hello-service:0.0.7
```
