let pgp = require('pg-promise')(/*options*/);
module.exports = pgp(
    'postgres://' +
    process.env.PSQL_USER +
    ':' +
    process.env.PSQL_PASSWORD +
    '@localhost:5432/cat_mash'
);