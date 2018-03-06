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
	knex('contacts').insert({name: name, email: email}).then(()=> console.log(`${name} with ${email} written to database`)).catch((error)=> console.error(error));
}

module.exports = {
  knex: knex,
  insert: insert
};