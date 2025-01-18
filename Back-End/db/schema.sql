DROP DATABASE IF EXISTS react_calculator_app;
CREATE DATABASE react_calculator_app;

\c react_calculator_app;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  profileimg TEXT,
  username TEXT UNIQUE NOT NULL,
  password TEXT,
  email TEXT UNIQUE,
  theme TEXT DEFAULT 'default',
  last_online TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS calculations;
CREATE TABLE calculations (
  id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL ON DELETE CASCADE,
  expression TEXT,
  result TEXT,
  date TIMESTAMP DEFAULT NOW()
);