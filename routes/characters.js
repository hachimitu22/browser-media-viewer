var express = require('express');
var router = express.Router();
const Label = require('./label.js');

function fetchCharacterInitials() {
  return [
    {
      initial: 'B',
      labels: [
        new Label('bison'),
        new Label('blue'),
        new Label('bob'),
      ],
    },
  ];
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('labels', {
    title: 'キャラクター一覧',
    blockInitials: fetchCharacterInitials(),
  });
});

module.exports = router;
