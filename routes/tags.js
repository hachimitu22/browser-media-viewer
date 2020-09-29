var express = require('express');
var router = express.Router();
const Label = require('./label.js');

function fetchTagInitials() {
  return [
    {
      initial: 'A',
      labels: [
        new Label('allow'),
        new Label('and'),
        new Label('array'),
      ],
    },
  ];
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('labels', {
    title: 'タグ一覧',
    blockInitials: fetchTagInitials(),
  });
});

module.exports = router;
