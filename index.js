var request = require('request');
var express = require('express');

var app = express();

// GET ?url=http://.../data.json&callback=myCallback
// returns myCallback(...);
app.get("/", function(req, res) {
  var url = req.query.url;
  var callback = req.query.callback;

  if (!url || !callback) {
    return res.status(400).send();
  }

  request({
    url: url,
    headers: {
      "User-agent": "com.wylieconlon.jsonp-proxy 0.0.1"
    }
  }, function(error, response, body) {
    res.status(response.statusCode)
    res.set({
      'Content-type': response.headers['content-type']
    });
    res.write(callback + '(' + body + ');');
    res.end();
  });

  return;
});

app.listen(80);
console.log("Listening on port 80");
