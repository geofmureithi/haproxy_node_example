express = require('express');
connect = require('connect');
request = require('request');
argv = require('optimist').argv;
app = express();
cluster = require('cluster');
cpuCount = require('os').cpus().length;
http = require('http');
http.globalAgent.maxSockets = 256;
app.use(connect.compress());

if (cluster.isMaster) {
  for (var i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  app.get('/api/test', function(req, res){
    console.log(argv.port);
    res.json({ok: true});
  });

  app.get('/twitter_proxy', function(req, res){
    console.log(argv.port);
    request.get({timeout: 10000, url: 'http://google.com', proxy : 'http://www-west.sony.com:80'}).pipe(res);
  });

  app.listen(argv.port || 3000);

  console.log(http.globalAgent.maxSockets);
}
