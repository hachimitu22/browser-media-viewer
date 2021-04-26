var express = require('express');
var router = express.Router();

const summaries = (new Array(101)).fill(0).map((_, _i) => {
  const i = _i + 1;
  return {
    manga: {
      title: `title${i}`,
      id: i * 100,
      thumbnail: '',
    },
    tags: [
      { text: `tag${i * 100 + 1}` },
      { text: `tag${i * 100 + 2}` },
    ],
    characters: [
      { text: `character${i * 100 + 1}` },
      { text: `character${i * 100 + 2}` },
    ],
    series: [
      { text: `series${i * 100 + 1}` },
      { text: `series${i * 100 + 2}` },
    ],
    authors: [
      { text: `author${i * 100 + 1}` },
      { text: `author${i * 100 + 2}` },
    ],
  };
});

/* GET home page. */
router.get('/', function (req, res, next) {
  const tempPage = parseInt(req.query.page, 10) || 1;
  const page = tempPage <= 0 ? 1 : tempPage;
  const index = page - 1;

  res.render('index', {
    title: 'Express',
    summaries: summaries.slice(index * 5, (index + 1) * 5),
  });
});

module.exports = router;
