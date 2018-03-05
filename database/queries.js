const knex = require('knex')({
    client: 'pg',
    connection: {
      host: '127.0.0.1', 
      user: 'macbookair', 
      password: '', 
      database: 'sbe'
    }
  });

const insert = function(name, email) {
	knex('contacts').insert({name: name, email: email}).then(()=> console.log(`${name} with ${email} written to database`)).catch((error)=> console.error(error));
}

module.exports = {
  knex: knex,
  insert: insert
};