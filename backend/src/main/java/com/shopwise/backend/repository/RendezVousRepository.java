package com.shopwise.backend.repository;

import com.shopwise.backend.entities.RendezVous;
import com.shopwise.backend.entities.StatutRendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface RendezVousRepository extends JpaRepository<RendezVous, Integer> {
    List<RendezVous> findByStatut(StatutRendezVous statut);

    List<RendezVous> findByDateRendezVous(LocalDate dateRendezVous);

    List<RendezVous> findByClientId(Integer clientId);
}
