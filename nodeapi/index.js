var express = require('express');
var app = express();
const https = require('https');
const http = require('http');
const url = require('url');
var fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/person', function(request1, serverRes) {
  // serverRes.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  // request1 = request1.body;
  const myBody = request1.body;

  // data = '{"number":"25984618","gender":"F","order":"00087712904"}';
  data =
    '{"number":"' +
    myBody.number +
    '","gender":"' +
    myBody.gender +
    '","order":"' +
    myBody.order +
    '"}';
  // serverRes.json({ requestBody: data });

  console.log(data);
  const uri = url.parse('https://renaper.dnm.gob.ar');
  const { request } = uri.protocol === 'https:' ? https : http;

  var options = {
    host: 'renaper.dnm.gob.ar',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apiKey: 'ad79d52f-9f09-43e9-a337-0b9127b9b543',
      url:
        'http://onboarding.renaper.prod.vusecurity.com:8080/vu-onboarding-rest/information/personData'
    }
  };

  const req = request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    var dataQueue = '';
    res.on('data', function(d) {
      dataQueue += d;
    });
    res.on('end', function() {
      console.log(dataQueue);
      serverRes.writeHead(200, { 'Content-Type': 'application/json' });
      serverRes.end(dataQueue);
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.write(data);
  req.end();
});
app.get('/face', function(request1, serverRes) {
  serverRes.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  var body = fs.readFileSync('image.txt');

  var base64String = body.toString();

  data =
    '{"number":"25984618","gender":"F","selfieList": [ {"file": "' +
    base64String +
    '","imageType": "SN"}],"browserFingerprintData": "base64Fingerprint"}';
  console.log(data);
  const uri = url.parse('https://renaper.dnm.gob.ar');
  const { request } = uri.protocol === 'https:' ? https : http;

  var options = {
    host: 'renaper.dnm.gob.ar',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apiKey: '82825990-b35c-46b1-ad8b-3b75dcda13a7',
      url:
        'http://onboarding.renaper.prod.vusecurity.com:8080/vu-onboarding-rest/face/login'
    }
  };

  const req = request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    var dataQueue = '';
    res.on('data', function(d) {
      dataQueue += d;
    });
    res.on('end', function() {
      console.log(dataQueue);
      serverRes.writeHead(200, { 'Content-Type': 'application/json' });
      serverRes.end(dataQueue);
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.write(data);
  req.end();
});

app.listen(3000, '192.168.0.110', () => {
  console.log('El servidor está inicializado en el puerto 3000');
});
