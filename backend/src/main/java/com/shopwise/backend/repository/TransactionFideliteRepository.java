package com.shopwise.backend.repository;

import com.shopwise.backend.entities.TransactionFidelite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionFideliteRepository extends JpaRepository<TransactionFidelite, Integer> {
    List<TransactionFidelite> findByClientId(Integer clientId);
}
