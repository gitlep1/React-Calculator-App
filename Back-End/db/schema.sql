DROP DATABASE IF EXISTS calcutor_db;
CREATE DATABASE calcutor_db;

\c calcutor_db;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  profileimg TEXT,
  username TEXT NOT NULL,
  password TEXT,
  email TEXT UNIQUE,
  theme TEXT DEFAULT 'default',
  last_online TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS calculations;
CREATE TABLE calculations (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  expression TEXT,
  result TEXT,
  calculator_type TEXT
);