const knex = require('knex') ({
    client: 'pg',

    connection: {
      host: '127.0.0.1', 
      user: 'macbookair', 
      password: '', 
      database: 'sbe', 
    }
  });

const insert = function(name, email) {
	knex('contacts').insert({name: name, email: email}).then();
}

module.exports = {
  knex: knex,
  insert: insert
};