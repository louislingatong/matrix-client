const path = require('path');
const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));