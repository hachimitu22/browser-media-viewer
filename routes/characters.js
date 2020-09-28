var express = require('express');
var router = express.Router();

function fetchCharacterInitials() {
  return [
    {
      initial: 'B',
      labels: [
        'bison', 'blue', 'bob'
      ],
    },
  ];
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('characters', {
    title: 'キャラクター一覧',
    characterInitials: fetchCharacterInitials(),
  });
});

module.exports = router;
