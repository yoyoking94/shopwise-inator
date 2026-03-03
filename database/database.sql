-- Création de la base de données
CREATE DATABASE IF NOT EXISTS shopwise;
USE shopwise;

-- Table client
CREATE TABLE client (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telephone VARCHAR(20),
    mot_de_passe VARCHAR(255) NOT NULL,
    date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table rendez_vous
CREATE TABLE rendez_vous (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    date_rendez_vous DATE NOT NULL,
    heure_rendez_vous TIME NOT NULL,
    service VARCHAR(100) NOT NULL,
    statut ENUM('EN_ATTENTE', 'HONORE', 'ANNULE') NOT NULL DEFAULT 'EN_ATTENTE',
    FOREIGN KEY (client_id) REFERENCES client(id)
);

-- Table points_fidelite
CREATE TABLE points_fidelite (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL UNIQUE,
    solde_points INT NOT NULL DEFAULT 0,
    FOREIGN KEY (client_id) REFERENCES client(id)
);

-- Table transaction_fidelite
CREATE TABLE transaction_fidelite (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    rendez_vous_id INT NOT NULL,
    points_attribues INT NOT NULL,
    date_transaction DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES client(id),
    FOREIGN KEY (rendez_vous_id) REFERENCES rendez_vous(id)
);

-- Table commercant
CREATE TABLE commercant (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE
);

-- Données de test
INSERT INTO client (nom, email, telephone, mot_de_passe) VALUES
('Alice Martin','alice@email.com','0601020304','motdepasse123'),
('Bob Durand','bob@email.com','0605060708','motdepasse123'),
('Clara Petit','clara@email.com','0609101112','motdepasse123');

INSERT INTO rendez_vous (client_id, date_rendez_vous, heure_rendez_vous, service, statut) VALUES
(1, '2026-03-05','10:00:00','Coupe cheveux','HONORE'),
(2, '2026-03-06','14:30:00','Coloration','EN_ATTENTE'),
(3, '2026-03-07','09:00:00','Soin visage','ANNULE');

INSERT INTO points_fidelite (client_id, solde_points) VALUES
(1, 10),
(2, 0),
(3, 0);

INSERT INTO transaction_fidelite (client_id, rendez_vous_id, points_attribues) VALUES
(1, 1, 10);

INSERT INTO commercant (nom, email) VALUES ('Marie Dupont', 'marie@shopwise.com');
