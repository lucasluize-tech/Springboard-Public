DROP DATABASE IF EXISTS craigslist;
CREATE DATABASE craigslist;
\c craigslist;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE region
(
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE location
(
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    region_id INTEGER REFERENCES region ON DELETE CASCADE
);

CREATE TABLE category
(
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
);

CREATE TABLE post
(
    post_id SERIAL PRIMARY KEY,
    region_id INTEGER REFERENCES region ON DELETE CASCADE,
    location_id INTEGER REFERENCES location ON DELETE CASCADE,
    user_id INTER REFERENCES users ON DELETE CASCADE,
    title TEXT UNIQUE NOT NULL,
    text TEXT,
    category_id INTEGER REFERENCES category ON DELETE CASCADE
);