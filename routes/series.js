var express = require('express');
var router = express.Router();

function fetchSeriesInitials() {
  return [
    {
      initial: 'S',
      labels: [
        'san', 'sum', 'syo'
      ],
    },
  ];
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('series', {
    title: '作品一覧',
    seriesInitials: fetchSeriesInitials(),
  });
});

module.exports = router;
