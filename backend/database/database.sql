CREATE DATABASE repont;

USE repont;

-- Üdítőket tároló tábla
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type_number VARCHAR(255) UNIQUE NOT NULL,
    product_name VARCHAR(255) NOT NULL
);

-- Automaták táblája
CREATE TABLE machines (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    machine_name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    installation_date DATETIME NOT NULL
);

-- Recycling táblája módosítva, hogy tartalmazza az automata id-ját
CREATE TABLE recycling (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    machine_id BIGINT,
    product BIGINT,
    event_type ENUM('success', 'error', 'warning') NOT NULL,
    event_date DATETIME NOT NULL,
    FOREIGN KEY (product) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (machine_id) REFERENCES machines(id) ON DELETE CASCADE
);

-- Ha már léteznek táblák, töröljük őket
DROP TABLE IF EXISTS recycling;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS machines;
