DROP DATABASE IF EXISTS soccer_league;
CREATE DATABASE soccer_league;
\c soccer_league;

CREATE TABLE team
(
    id SERIAL PRIMARY KEY,
    team_name TEXT UNIQUE NOT NULL,
    is_active BOOLEAN

);

CREATE TABLE player
(
    id SERIAL PRIMARY KEY,
    player_name TEXT NOT NULL,
    team_id INT REFERENCES team ON DELETE CASCADE,
    is_active BOOLEAN
);

CREATE TABLE match
(
    id SERIAL PRIMARY KEY,
    match_day DATE NOT NULL,
    season_id INT REFERENCES season ON DELETE NOT NULL,
    team1_id INT REFERENCES team ON DELETE NOT NULL,
    team2_id INT REFERENCES team ON DELETE NOT NULL,
    referee1_id INT REFERENCES referee ON DELETE NOT NULL,
    referee2_id INT REFERENCES referee ON DELETE NOT NULL,
    referee3_id INT REFERENCES referee ON DELETE NOT NULL,
    referee4_id INT REFERENCES referee ON DELETE NOT NULL,
    match_winner INT REFERENCES team on DELETE NULL
);

CREATE TABLE goal
(
    id SERIAL PRIMARY KEY,
    player_id INT REFERENCES player ON DELETE CASCADE,
    match_day DATE REFERENCES match(match_day) ON DELETE CASCADE,
    team_id INT team ON DELETE CASCADE
);

CREATE TABLE referee
(
    id SERIAL PRIMARY KEY,
    referee_name TEXT UNIQUE NOT NULL,
    is_active BOOLEAN
);

CREATE TABLE season
(
    id SERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE
);

-- how to get the standings?
-- getting the sum of how many match_winner instances by team in descending order.
-- than followed by the sum of goals scored for tie breaks.