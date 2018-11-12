DROP TABLE IF EXISTS users, events, clubs, users_to_events;
SHOW TABLES;
CREATE TABLE users(id SERIAL, fname VARCHAR(20), lname VARCHAR(20), 
dateOfBirth VARCHAR(8), email VARCHAR(50), username VARCHAR(20), password VARCHAR(30), UNIQUE(id, username));
CREATE TABLE users_to_events(id SERIAL, username VARCHAR(20), event_id INT, UNIQUE(id));
CREATE TABLE events(id SERIAL, name VARCHAR(20), club_id INT, location VARCHAR(50), moi VARCHAR(20), 
information VARCHAR(500), eventdate VARCHAR(10), clubname VARCHAR(20), UNIQUE(id));
CREATE TABLE clubs(id SERIAL, name VARCHAR(20), information VARCHAR(500), presidentName VARCHAR(40), UNIQUE(id, name));
SELECT * FROM clubs;
USE clubfinity;