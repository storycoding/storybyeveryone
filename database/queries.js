const knex = require('knex')({
    client: 'pg',
    connection: {
      host: process.env.HOST, 
      user: process.env.USER, 
      password: process.env.PASSWORD, 
      database: process.env.DATABASE
    }
  });

const insert = function(name, email) {
	knex('contacts').insert({name: name, email: email});
}

module.exports = {
  knex: knex,
  insert: insert
};