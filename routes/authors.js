var express = require('express');
var router = express.Router();
const Label = require('./label.js');

function fetchAuthorsInitials() {
  return [
    {
      initial: 'C',
      labels: [
        new Label('canon'),
        new Label('cocoa'),
        new Label('cyan'),
      ],
    },
  ];
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('labels', {
    title: '作者一覧',
    blockInitials: fetchAuthorsInitials(),
  });
});

module.exports = router;
