-- Utilisateurs
INSERT IGNORE INTO utilisateur (nom, email, mot_de_passe, telephone, role, date_creation) VALUES
('Marie Dupont', 'commercant@shopwise.com', 'shopwise123', '0600000000', 'COMMERCANT', NOW()),
('Alice Martin', 'alice@email.com', 'alice123', '0601020304', 'CLIENT', NOW()),
('Bob Durand', 'bob@email.com', 'bob123', '0605060708', 'CLIENT', NOW()),
('Clara Petit', 'clara@email.com', 'clara123', '0609101112', 'CLIENT', NOW());

-- Rendez-vous
INSERT IGNORE INTO rendez_vous (utilisateur_id, date_rendez_vous, heure_rendez_vous, service, statut) VALUES
(2, '2026-03-05', '10:00:00', 'Coupe cheveux', 'HONORE'),
(3, '2026-03-06', '14:30:00', 'Coloration', 'EN_ATTENTE'),
(4, '2026-03-07', '09:00:00', 'Soin visage', 'ANNULE');

-- Points fidélité
INSERT IGNORE INTO points_fidelite (utilisateur_id, solde_points) VALUES
(2, 10),
(3, 0),
(4, 0);

-- Transaction fidélité
INSERT IGNORE INTO transaction_fidelite (utilisateur_id, rendez_vous_id, points_attribues, date_transaction) VALUES
(2, 1, 10, NOW());