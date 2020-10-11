var express = require('express');
var router = express.Router();
const Label = require('./label.js');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 's2727mitu1212mitus',
  database: 'media_viewer',
});

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
  res.render('upload', {
    title: 'アップロード'
  });
});

router.post('/', function (req, res, next) {
  console.log(req.body);

  const title = req.body.title;
  const title_en = req.body.title_en;
  const query = `insert into manga (title, title_en) values ('${title}', '${title_en}');`;

  connection.query(query).on('error', (err) => {
    console.log('err is: ', err);
  }).on('result', (rows) => {
    console.log('result: ', rows);
  }).on('end', () => {
    console.log('end');
    res.redirect('/');
  });
});

module.exports = router;
