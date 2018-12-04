const express = require('express');
const path = require('path');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;

const env = {
  'NETWORK_ID': process.env.NETWORK_ID || 4,
  'API_KEY': process.env.API_KEY || 0,
  'ALCHEMY': process.env.ALCHEMY || 0,
}
// console.log('ENV',env.NETWORK_ID)

app.use(function(req,res,next){
  if (req.secure){
    next();
  } else{
    res.redirect('https://' + req.headers.host);
  }
});
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/env.js', function (req, res) {
  res.set('Content-Type', 'application/javascript');
  res.send('var env = ' + JSON.stringify(env));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});
