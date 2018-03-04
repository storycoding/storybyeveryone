CREATE DATABASE SBE;
\c sbe;

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name varchar(24) NOT NULL,
  email varchar(24) NOT NULL
);

INSERT INTO contacts(name, email) VALUES ('Nuno', 'youknownuno@gmail.com');