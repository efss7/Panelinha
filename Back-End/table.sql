-- Active: 1653331321827@@35.226.146.116@3306@silveira-21814331-eric-silva
CREATE TABLE teppa_cities(  
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL
);


CREATE TABLE teppa_people(  
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    cityId VARCHAR(255) NOT NULL,
    FOREIGN KEY(cityId) REFERENCES `teppa_cities`(id)
)