var express = require('express');
var router = express.Router();
const Label = require('./label.js');
const connection = require('./database');
const multer = require('multer');
const path = require('path');

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
  console.log(__dirname);

  res.render('upload', {
    title: 'アップロード',
    categories: [
      { name: 'series', placeholder: 'シリーズ' },
      { name: 'author', placeholder: '作者' },
      { name: 'character', placeholder: 'キャラクター' },
      { name: 'tag', placeholder: 'タグ' }
    ],
  });
});

router.post('/', function (req, res, next) {
  console.log('files:', req.files);
  console.log('body:', req.body);

  const title = req.body.title;
  const upload = multer({
    // dest: `public/images/${title}/`,
    storage: multer.diskStorage({
      destination: function (req, file, callback) {
        const title = req.body.title;
        console.log('in body:', req.body);
        // callback(null, `public/images/${title}/`);
        callback(null, `public/images/`);
      },
      filename: function (req, file, callback) {
        // console.log('filename:', file);
        callback(null, file.originalname);
      },
    }),
  }).any();

  upload(req, res, function (err) {
    console.log('upload err:', err);
  });

  return;

  const query = `show table status like 'manga';`;
  connection.query(query).on('error', (err) => {
    console.log('err is: ', err);
  }).on('result', (rows) => {
    console.log('result: ', rows);
    const id = rows.Auto_increment;
    const title = req.body.title;
    const title_en = req.body.title_en;
    const images = req.body.images;
    const queries = [
      'delimiter //',
      'create trigger trigger_name',
      'begin',
      `insert into manga (title, title_en) values ('${title}', '${title_en}');`,
      `insert into image (manga_id, page_number, path) values ` + images.map((image, i) => {
        const pageNumber = i + 1;
        return `('${id}', '${pageNumber}', '${image}')`;
      }).join(',\n') + ';',
      `insert into tag (title, title_en) values ('${title}', '${title_en}');`,
      `insert into manga_tag (title, title_en) values ('${title}', '${title_en}');`,
      'end',
      'delimiter ;',
    ];
    const query = queries.join('\n');

    connection.query(query).on('error', (err) => {
      console.log('err is: ', err);
    }).on('result', (rows) => {
      console.log('result: ', rows);

      const images = [];
      const path = `public/images/${title}`;
      saveImages(path, images);

    }).on('end', () => {
      console.log('end');
      res.redirect('/');
    });
  }).on('end', () => {
    // nop.
  });

});

module.exports = router;
