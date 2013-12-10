express = require('express');
argv = require('optimist').argv;
app = express();

app.get('/', function(req, res){
  res.json({foo: 'bar'});
});

app.listen(argv.port || 3000);
