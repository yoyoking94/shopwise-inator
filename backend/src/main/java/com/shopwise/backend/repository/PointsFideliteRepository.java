package com.shopwise.backend.repository;

import com.shopwise.backend.entities.PointsFidelite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PointsFideliteRepository extends JpaRepository<PointsFidelite, Integer> {
    Optional<PointsFidelite> findByClientId(Integer clientId);
}
