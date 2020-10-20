var express = require('express');
var router = express.Router();
const Label = require('./label.js');
const connection = require('./database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

function createUpload(mangaID) {
  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, `public/images/${mangaID}/`);
      },
      filename: function (req, file, callback) {
        callback(null, file.originalname);
      },
    }),
  }).array('images');

  return upload;
}

router.post('/', function (req, res, next) {
  // console.log('files:', req.files);
  // console.log('body:', req.body);

  connection.beginTransaction(err => {
    if (err) throw err;

    const query = `show table status like 'manga';`;
    connection.query(query, (err, results) => {
      if (err) return connection.rollback(() => { throw err; });

      console.log('show:', results);
      const id = results[0].Auto_increment + 1;
      const upload = createUpload(id);
      const path = `public/images/${id}/`;

      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }

      upload(req, res, function (err) {
        if (err) return connection.rollback(() => { throw err; });

        console.log('upload files:', req.files);
        console.log('upload body:', req.body);
        console.log('upload body title:', req.body.title);
        console.log('upload err:', err);

        const title = req.body.title;
        const title_en = req.body.title_en;
        const query = `insert into manga (title, title_en) values ('${title}', '${title_en}');`
        connection.query(query, err => {
          if (err) return connection.rollback(() => { throw err; });

          const files = req.files;
          const values = files.map((file, i) => `('${id}', '${i + 1}', '${file.originalname}')`);
          const query = `insert into image (manga_id, page_number, path) values ${values.join(', ')};`;

          connection.query(query, err => {
            if (err) return connection.rollback(() => { throw err; });
            connection.commit(err => {
              if (err) return connection.rollback(() => { throw err; });
              res.redirect('/');
            });
          });
        });
      });
    });
  });
});

module.exports = router;
