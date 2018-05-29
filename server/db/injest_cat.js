const psql = require('../config/db');
const cats = require('../cats.json');

cats.images.forEach((cat, i) => {
    console.log('Injest ' + i + ' of ' + cats.images.length);
    psql.none('INSERT INTO cat(link) VALUES($1)', [cat.url]);
});
