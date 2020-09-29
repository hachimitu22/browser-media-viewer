var express = require('express');
var router = express.Router();
const Label = require('./label.js');

function fetchSeriesInitials() {
  return [
    {
      initial: 'S',
      labels: [
        new Label('san'),
        new Label('sum'),
        new Label('syo'),
      ],
    },
  ];
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('labels', {
    title: '作品一覧',
    blockInitials: fetchSeriesInitials(),
  });
});

module.exports = router;
