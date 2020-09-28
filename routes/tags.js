var express = require('express');
var router = express.Router();

function fetchTagInitials() {
  return [
    {
      initial: 'A',
      labels: [
        'allow', 'and', 'array'
      ],
    },
  ];
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tags', {
    title: 'タグ一覧',
    tagInitials: fetchTagInitials(),
  });
});

module.exports = router;
