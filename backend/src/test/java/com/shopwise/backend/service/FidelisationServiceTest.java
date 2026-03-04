package com.shopwise.backend.service;

import com.shopwise.backend.dto.TransactionFideliteDTO;
import com.shopwise.backend.entities.*;
import com.shopwise.backend.mapper.TransactionFideliteMapper;
import com.shopwise.backend.repository.PointsFideliteRepository;
import com.shopwise.backend.repository.TransactionFideliteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FidelisationServiceTest {

    @Mock
    private PointsFideliteRepository pointsFideliteRepository;

    @Mock
    private TransactionFideliteRepository transactionFideliteRepository;

    @Mock
    private TransactionFideliteMapper transactionFideliteMapper;

    @InjectMocks
    private FidelisationService fidelisationService;

    private Utilisateur utilisateur;
    private RendezVous rendezVous;
    private PointsFidelite pointsFidelite;

    @BeforeEach
    void initialiser() {
        utilisateur = new Utilisateur();
        utilisateur.setId(1);

        rendezVous = new RendezVous();
        rendezVous.setId(1);
        rendezVous.setUtilisateur(utilisateur);

        pointsFidelite = new PointsFidelite();
        pointsFidelite.setUtilisateur(utilisateur);
        pointsFidelite.setSoldePoints(0);
    }

    @Test
    void attribuerPoints_augmenteLeSolde() {
        when(pointsFideliteRepository.findByUtilisateurId(1)).thenReturn(Optional.of(pointsFidelite));

        fidelisationService.attribuerPoints(rendezVous);

        assertEquals(10, pointsFidelite.getSoldePoints());
        verify(pointsFideliteRepository, times(1)).save(pointsFidelite);
        verify(transactionFideliteRepository, times(1)).save(any());
    }

    @Test
    void attribuerPoints_sansPointsFidelite_leveException() {
        when(pointsFideliteRepository.findByUtilisateurId(1)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> fidelisationService.attribuerPoints(rendezVous));
    }

    @Test
    void recupererSoldePoints_avecClientExistant_retourneSolde() {
        pointsFidelite.setSoldePoints(20);
        when(pointsFideliteRepository.findByUtilisateurId(1)).thenReturn(Optional.of(pointsFidelite));

        Integer solde = fidelisationService.recupererSoldePoints(1);

        assertEquals(20, solde);
    }

    @Test
    void recupererSoldePoints_avecClientInexistant_leveException() {
        when(pointsFideliteRepository.findByUtilisateurId(99)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> fidelisationService.recupererSoldePoints(99));
    }

    @Test
    void recupererHistoriqueTransactions_retourneListe() {
        when(transactionFideliteRepository.findByUtilisateurId(1)).thenReturn(List.of());

        List<TransactionFideliteDTO> resultat = fidelisationService.recupererHistoriqueTransactions(1);

        assertNotNull(resultat);
        assertEquals(0, resultat.size());
    }

    @Test
    void recupererHistoriqueTransactions_avecTransactions_mappeCorrectement() {
        TransactionFidelite tx = new TransactionFidelite();
        TransactionFideliteDTO dto = new TransactionFideliteDTO();

        when(transactionFideliteRepository.findByUtilisateurId(1)).thenReturn(List.of(tx));
        when(transactionFideliteMapper.versDTO(tx)).thenReturn(dto);

        List<TransactionFideliteDTO> resultat = fidelisationService.recupererHistoriqueTransactions(1);

        assertEquals(1, resultat.size());
        verify(transactionFideliteMapper, times(1)).versDTO(tx);
    }
}
