var express = require('express');
var router = express.Router();

function fetchAuthorsInitials() {
  return [
    {
      initial: 'C',
      labels: [
        'canon', 'cocoa', 'cyan'
      ],
    },
  ];
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('authors', {
    title: '作者一覧',
    authorInitials: fetchAuthorsInitials(),
  });
});

module.exports = router;
