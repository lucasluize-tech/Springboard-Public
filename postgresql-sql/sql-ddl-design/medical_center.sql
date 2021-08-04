DROP DATABASE IF EXISTS medical_center;
CREATE DATABASE medical_center;
\c medical_center;
CREATE TABLE doctor
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE patient
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    checked_in DATE NOT NULL,
    checked_out BOOLEAN NOT NULL DEFAULT false  
);

CREATE TABLE consult
(
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    doctor_id INTEGER REFERENCES doctor ON DELETE CASCADE,
    patient_id INTEGER REFERENCES patient ON DELETE CASCADE
);

CREATE TABLE desease
(
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
);

CREATE TABLE diagnostic
(
    id SERIAL PRIMARY KEY,
    consult_id INTEGER REFERENCES consult ON DELETE CASCADE,
    desease_id INTEGER REFERENCES desease ON DELETE CASCADE
);