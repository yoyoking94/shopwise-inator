package com.shopwise.backend.service;

import com.shopwise.backend.dto.TransactionFideliteDTO;
import com.shopwise.backend.entities.PointsFidelite;
import com.shopwise.backend.entities.RendezVous;
import com.shopwise.backend.entities.TransactionFidelite;
import com.shopwise.backend.mapper.TransactionFideliteMapper;
import com.shopwise.backend.repository.PointsFideliteRepository;
import com.shopwise.backend.repository.TransactionFideliteRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FidelisationService {

    private static final int POINTS_PAR_RENDEZ_VOUS = 10;

    private final PointsFideliteRepository pointsFideliteRepository;
    private final TransactionFideliteRepository transactionFideliteRepository;
    private final TransactionFideliteMapper transactionFideliteMapper;

    public void attribuerPoints(RendezVous rendezVous) {
        PointsFidelite pointsFidelite = pointsFideliteRepository
                .findByUtilisateurId(rendezVous.getUtilisateur().getId())
                .orElseThrow(() -> new EntityNotFoundException(
                        "Points introuvables pour l'utilisateur : " + rendezVous.getUtilisateur().getId()));

        pointsFidelite.setSoldePoints(pointsFidelite.getSoldePoints() + POINTS_PAR_RENDEZ_VOUS);
        pointsFideliteRepository.save(pointsFidelite);

        TransactionFidelite transaction = new TransactionFidelite();
        transaction.setUtilisateur(rendezVous.getUtilisateur());
        transaction.setRendezVous(rendezVous);
        transaction.setPointsAttribues(POINTS_PAR_RENDEZ_VOUS);
        transactionFideliteRepository.save(transaction);
    }

    public Integer recupererSoldePoints(Integer clientId) {
        return pointsFideliteRepository.findByUtilisateurId(clientId)
                .orElseThrow(
                        () -> new EntityNotFoundException("Points fidélité introuvables pour le client : " + clientId))
                .getSoldePoints();
    }

    public List<TransactionFideliteDTO> recupererHistoriqueTransactions(Integer clientId) {
        return transactionFideliteRepository.findByUtilisateurId(clientId)
                .stream()
                .map(transactionFideliteMapper::versDTO)
                .toList();
    }
}
