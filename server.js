const express = require('express');
const app = express();
const Building = require('./models/Building');

app.use(logger('dev'));
// app.use(express.static('public'));
app.use(express.static('client/build'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// static files
app.use(express.static('public'));

const PORT = process.env.PORT || 4567;

app.get('/buildings.json', (req, res) => {
  Building.findAll()
  .then(buildingData => {
    console.log(buildingData)
    res.json(buildingData)
  });
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use('*', (req, res) => {
  res.status(404).send('not found!');
});
