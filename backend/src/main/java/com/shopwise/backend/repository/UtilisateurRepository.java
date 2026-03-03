package com.shopwise.backend.repository;

import com.shopwise.backend.entities.RoleUtilisateur;
import com.shopwise.backend.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {
    Optional<Utilisateur> findByEmail(String email);

    List<Utilisateur> findByRole(RoleUtilisateur role);
}
