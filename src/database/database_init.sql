CREATE DATABASE MoviesInfo;
USE MoviesInfo;

CREATE TABLE Movies (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(255), 
    year YEAR, 
    genre VARCHAR(255), 
    description TEXT, 
    director VARCHAR(255) NOT NULL, 
    actors TEXT NOT NULL, 
    soundtrack TEXT,
    avg_rating INT
);

CREATE TABLE MovieGallery (
    id INT IDENTITY(1,1) PRIMARY KEY,
    movie_id INT NOT NULL,
    thumbnail TEXT,
    FOREIGN KEY (movie_id) REFERENCES Movies(id)
);

CREATE TABLE Reviews (
    id INT IDENTITY(1,1) PRIMARY KEY,
    movie_id INT NOT NULL,
    review_text TEXT NOT NULL,
    rating INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES Movies(id)
);

CREATE TABLE GalleryPicture (
    id INT IDENTITY(1,1) PRIMARY KEY,
    gallery_id INT NOT NULL,
    picture TEXT NOT NULL,
    FOREIGN KEY (gallery_id) REFERENCES MovieGallery(id)
);