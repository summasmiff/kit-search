const express = require('express');
const path = require('path');
const search_controller = require('./controllers/searchController');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
  return res.status(200).json({
    data: 'pong',
    error: null
  });
});

app.get('/search', search_controller.search);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server listening on port: 8080");
});
