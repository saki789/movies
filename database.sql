-- Create Database
CREATE DATABASE IF NOT EXISTS movie_db;

USE movie_db;

-- Movies Table
CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  overview TEXT,
  poster_path VARCHAR(255),
  release_date DATE,
  vote_average DECIMAL(3,1),
  runtime INT, -- runtime in minutes
  language VARCHAR(50),
  movie_path VARCHAR(255), -- Path or URL to the movie file
  trailer_path VARCHAR(255), -- Path or URL to the movie trailer
  budget DECIMAL(15,2), -- Movie budget
  box_office DECIMAL(15,2), -- Box office revenue
  country VARCHAR(100), -- Country of origin
  director VARCHAR(255) -- Director of the movie
);

-- Genres Table
CREATE TABLE IF NOT EXISTS genres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- Movie Genres Junction Table (Many-to-Many Relationship)
CREATE TABLE IF NOT EXISTS movie_genres (
  movie_id INT,
  genre_id INT,
  PRIMARY KEY (movie_id, genre_id),
  FOREIGN KEY (movie_id) REFERENCES movies(id),
  FOREIGN KEY (genre_id) REFERENCES genres(id)
);

-- Actors Table
CREATE TABLE IF NOT EXISTS actors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  birth_date DATE
);

-- Movie Actors Junction Table (Many-to-Many Relationship)
CREATE TABLE IF NOT EXISTS movie_actors (
  movie_id INT,
  actor_id INT,
  PRIMARY KEY (movie_id, actor_id),
  FOREIGN KEY (movie_id) REFERENCES movies(id),
  FOREIGN KEY (actor_id) REFERENCES actors(id)
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT,
  user_id INT,
  rating DECIMAL(2,1),
  review_text TEXT,
  review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Directors Table
CREATE TABLE IF NOT EXISTS directors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  birth_date DATE,
  nationality VARCHAR(100)
);

-- Movie Directors Junction Table (Many-to-Many Relationship)
CREATE TABLE IF NOT EXISTS movie_directors (
  movie_id INT,
  director_id INT,
  PRIMARY KEY (movie_id, director_id),
  FOREIGN KEY (movie_id) REFERENCES movies(id),
  FOREIGN KEY (director_id) REFERENCES directors(id)
);

-- Awards Table
CREATE TABLE IF NOT EXISTS awards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT,
  award_name VARCHAR(255),
  year INT,
  won BOOLEAN,
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

-- Watchlist Table
CREATE TABLE IF NOT EXISTS watchlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  movie_id INT,
  added_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

-- Movie Tags Table
CREATE TABLE IF NOT EXISTS movie_tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT,
  tag VARCHAR(100),
  FOREIGN KEY (movie_id) REFERENCES movies(id)
);

-- Roles Table
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT,
  actor_id INT,
  role_name VARCHAR(255),
  FOREIGN KEY (movie_id) REFERENCES movies(id),
  FOREIGN KEY (actor_id) REFERENCES actors(id)
);

-- Award Categories Table
CREATE TABLE IF NOT EXISTS award_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL
);

-- Movie Awards Table
CREATE TABLE IF NOT EXISTS movie_awards (
  movie_id INT,
  category_id INT,
  year INT,
  won BOOLEAN,
  PRIMARY KEY (movie_id, category_id, year),
  FOREIGN KEY (movie_id) REFERENCES movies(id),
  FOREIGN KEY (category_id) REFERENCES award_categories(id)
);

-- User Preferences Table
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id INT,
  genre_id INT,
  preference_level INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (genre_id) REFERENCES genres(id)
);

-- Insert demo data into genres
INSERT INTO genres (name) VALUES 
('Action'), 
('Adventure'), 
('Drama'), 
('Comedy'), 
('Horror'), 
('Sci-Fi'), 
('Romance'),
('Crime'),
('Fantasy'),
('Historical'),
('Musical'),
('Mystery'),
('Thriller'),
('Western');

-- Insert demo data into movies
INSERT INTO movies (title, overview, poster_path, release_date, vote_average, runtime, language, movie_path, trailer_path, budget, box_office, country, director) VALUES 
('Avengers: Endgame', 'The remaining Avengers must figure out a way to bring back their vanquished allies for one final showdown with Thanos.', '/app/images/avengers_endgame.png', '2019-04-26', 8.4, 181, 'English', '/movies/avengers_endgame.mp4', '/trailers/avengers_endgame.mp4', 356000000, 2797800564, 'USA', 'Anthony Russo'),
('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.', '/app/images/inception.png', '2010-07-16', 8.8, 148, 'English', '/movies/inception.mp4', '/trailers/inception.mp4', 160000000, 836800000, 'USA', 'Christopher Nolan'),
('The Godfather', 'An organized crime dynasty\'s aging patriarch transfers control of his clandestine empire to his reluctant son.', '/app/images/godfather.png', '1972-03-24', 9.2, 175, 'English', '/movies/godfather.mp4', '/trailers/godfather.mp4', 6000000, 250000000, 'USA', 'Francis Ford Coppola'),
('Toy Story', 'A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy\'s room.', '/app/images/toy_story.png', '1995-11-22', 8.3, 81, 'English', '/movies/toy_story.mp4', '/trailers/toy_story.mp4', 30000000, 373554033, 'USA', 'John Lasseter'),
('The Shining', 'A family heads to an isolated hotel for the winter where an evil spiritual presence influences the father into violence.', '/app/images/shining.png', '1980-05-23', 8.4, 146, 'English', '/movies/shining.mp4', '/trailers/shining.mp4', 19000000, 47100000, 'USA', 'Stanley Kubrick');

-- Insert demo data into actors
INSERT INTO actors (name, birth_date) VALUES 
('Robert Downey Jr.', '1965-04-04'),
('Leonardo DiCaprio', '1974-11-11'),
('Marlon Brando', '1924-04-03'),
('Tom Hanks', '1956-07-09'),
('Jack Nicholson', '1937-04-22');

-- Insert demo data into movie_genres
INSERT INTO movie_genres (movie_id, genre_id) VALUES 
(1, 1), -- Avengers: Endgame - Action
(1, 2), -- Avengers: Endgame - Adventure
(2, 1), -- Inception - Action
(2, 6), -- Inception - Sci-Fi
(3, 3), -- The Godfather - Drama
(4, 4), -- Toy Story - Comedy
(5, 5); -- The Shining - Horror

-- Insert demo data into movie_actors
INSERT INTO movie_actors (movie_id, actor_id) VALUES 
(1, 1), -- Avengers: Endgame - Robert Downey Jr.
(2, 2), -- Inception - Leonardo DiCaprio
(3, 3), -- The Godfather - Marlon Brando
(4, 4), -- Toy Story - Tom Hanks
(5, 5); -- The Shining - Jack Nicholson

-- Insert demo data into reviews
INSERT INTO reviews (movie_id, user_id, rating, review_text, review_date) VALUES 
(1, 1, 9.0, 'An epic conclusion to the Marvel saga!', NOW()),
(2, 2, 10.0, 'Mind-bending and brilliantly executed!', NOW()),
(3, 3, 9.5, 'A masterpiece in cinema history.', NOW()),
(4, 4, 8.0, 'A heartwarming story for all ages.', NOW()),
(5, 5, 9.0, 'A chilling horror classic.', NOW());

-- Insert demo data into users
INSERT INTO users (username, email, password_hash) VALUES 
('user1', 'user1@example.com', 'hashed_password1'),
('user2', 'user2@example.com', 'hashed_password2'),
('user3', 'user3@example.com', 'hashed_password3');

-- Insert demo data into directors
INSERT INTO directors (name, birth_date, nationality) VALUES 
('Anthony Russo', '1970-02-03', 'American'),
('Christopher Nolan', '1970-07-30', 'British-American'),
('Francis Ford Coppola', '1939-04-07', 'American'),
('John Lasseter', '1957-01-12', 'American'),
('Stanley Kubrick', '1928-07-26', 'American');

-- Insert demo data into movie_directors
INSERT INTO movie_directors (movie_id, director_id) VALUES 
(1, 1), -- Avengers: Endgame - Anthony Russo
(2, 2), -- Inception - Christopher Nolan
(3, 3), -- The Godfather - Francis Ford Coppola
(4, 4), -- Toy Story - John Lasseter
(5, 5); -- The Shining - Stanley Kubrick

-- Insert demo data into award_categories
INSERT INTO award_categories (category_name) VALUES 
('Best Picture'),
('Best Director'),
('Best Actor'),
('Best Actress'),
('Best Cinematography'),
('Best Editing'),
('Best Original Screenplay'),
('Best Adapted Screenplay'),
('Best Visual Effects'),
('Best Sound Editing');

-- Insert demo data into movie_awards
INSERT INTO movie_awards (movie_id, category_id, year, won) VALUES 
(1, 1, 2019, TRUE), -- Avengers: Endgame - Best Picture
(2, 2, 2010, TRUE), -- Inception - Best Director
(3, 3, 1972, TRUE), -- The Godfather - Best Actor
(4, 4, 1995, TRUE), -- Toy Story - Best Original Screenplay
(5, 5, 1980, TRUE); -- The Shining - Best Cinematography

-- Insert demo data into user_preferences
INSERT INTO user_preferences (user_id, genre_id, preference_level) VALUES 
(1, 1, 5), -- User1 prefers Action
(1, 2, 4), -- User1 prefers Adventure
(2, 3, 5), -- User2 prefers Drama
(2, 4, 3), -- User2 prefers Comedy
(3, 5, 4); -- User3 prefers Horror

-- Create Indexes
CREATE INDEX idx_movies_title ON movies(title);
CREATE INDEX idx_reviews_movie_id ON reviews(movie_id);
CREATE INDEX idx_watchlist_user_id ON watchlist(user_id);
