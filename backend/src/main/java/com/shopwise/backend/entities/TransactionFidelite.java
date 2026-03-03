package com.shopwise.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "transaction_fidelite")
public class TransactionFidelite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "rendez_vous_id", nullable = false)
    private RendezVous rendezVous;

    @Column(name = "points_attribues", nullable = false)
    private Integer pointsAttribues;

    @Column(name = "date_transaction", nullable = false)
    private LocalDateTime dateTransaction = LocalDateTime.now();
}
