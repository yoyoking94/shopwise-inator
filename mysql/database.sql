-- drop database shopwise; 

CREATE DATABASE IF NOT EXISTS shopwise;
USE shopwise;

-- Table unique utilisateur (remplace client + utilisateur)
CREATE TABLE utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    role ENUM('CLIENT', 'COMMERCANT') NOT NULL
);

-- Table rendez_vous (client_id pointe maintenant vers utilisateur)
CREATE TABLE rendez_vous (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL,
    date_rendez_vous DATE NOT NULL,
    heure_rendez_vous TIME NOT NULL,
    service VARCHAR(100)  NOT NULL,
    statut ENUM('EN_ATTENTE', 'HONORE', 'ANNULE') NOT NULL DEFAULT 'EN_ATTENTE',
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);

-- Table points_fidelite
CREATE TABLE points_fidelite (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL UNIQUE,
    solde_points INT NOT NULL DEFAULT 0,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);

-- Table transaction_fidelite
CREATE TABLE transaction_fidelite (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL,
    rendez_vous_id INT NOT NULL,
    points_attribues INT NOT NULL,
    date_transaction DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id),
    FOREIGN KEY (rendez_vous_id) REFERENCES rendez_vous(id)
);

-- Données de test
INSERT INTO utilisateur (nom, email, mot_de_passe, telephone, role) VALUES
('Marie Dupont', 'commercant@shopwise.com', 'shopwise123', '0600000000', 'COMMERCANT'),
('Alice Martin', 'alice@email.com', 'alice123', '0601020304', 'CLIENT'),
('Bob Durand', 'bob@email.com', 'bob123', '0605060708', 'CLIENT'),
('Clara Petit', 'clara@email.com', 'clara123', '0609101112', 'CLIENT');

INSERT INTO rendez_vous (utilisateur_id, date_rendez_vous, heure_rendez_vous, service, statut) VALUES
(2, '2026-03-05', '10:00:00', 'Coupe cheveux', 'HONORE'),
(3, '2026-03-06', '14:30:00', 'Coloration', 'EN_ATTENTE'),
(4, '2026-03-07', '09:00:00', 'Soin visage', 'ANNULE');

INSERT INTO points_fidelite (utilisateur_id, solde_points) VALUES
(2, 10),
(3, 0),
(4, 0);

INSERT INTO transaction_fidelite (utilisateur_id, rendez_vous_id, points_attribues) VALUES
(2, 1, 10);

select * from utilisateur;
