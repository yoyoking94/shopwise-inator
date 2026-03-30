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

import static org.assertj.core.api.Assertions.*;
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
    void initialiserDonnees() {
        utilisateur = new Utilisateur();
        utilisateur.setId(2);
        utilisateur.setNom("Bob");
        utilisateur.setEmail("bob@email.com");
        utilisateur.setMotDePasse("bob123");
        utilisateur.setRole(RoleUtilisateur.CLIENT);

        rendezVous = new RendezVous();
        rendezVous.setId(1);
        rendezVous.setUtilisateur(utilisateur);
        rendezVous.setStatut(StatutRendezVous.HONORE);

        pointsFidelite = new PointsFidelite();
        pointsFidelite.setId(1);
        pointsFidelite.setUtilisateur(utilisateur);
        pointsFidelite.setSoldePoints(10);
    }

    @Test
    void attribuerPoints_avecUtilisateurExistant_augmenteLeSolde() {
        when(pointsFideliteRepository.findByUtilisateurId(2)).thenReturn(Optional.of(pointsFidelite));
        when(pointsFideliteRepository.save(any())).thenReturn(pointsFidelite);

        fidelisationService.attribuerPoints(rendezVous);

        assertThat(pointsFidelite.getSoldePoints()).isEqualTo(20);
        verify(transactionFideliteRepository, times(1)).save(any(TransactionFidelite.class));
    }

    @Test
    void attribuerPoints_avecUtilisateurInexistant_lancheException() {
        when(pointsFideliteRepository.findByUtilisateurId(2)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> fidelisationService.attribuerPoints(rendezVous))
                .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    void recupererSoldePoints_avecClientExistant_retourneSolde() {
        when(pointsFideliteRepository.findByUtilisateurId(2)).thenReturn(Optional.of(pointsFidelite));

        Integer solde = fidelisationService.recupererSoldePoints(2);

        assertThat(solde).isEqualTo(10);
    }

    @Test
    void recupererSoldePoints_avecClientSansPoints_retourneZero() {
        when(pointsFideliteRepository.findByUtilisateurId(99)).thenReturn(Optional.empty());

        Integer solde = fidelisationService.recupererSoldePoints(99);

        assertThat(solde).isEqualTo(0);
    }

    @Test
    void recupererHistoriqueTransactions_retourneListe() {
        TransactionFidelite transaction = new TransactionFidelite();
        TransactionFideliteDTO transactionDTO = new TransactionFideliteDTO();

        when(transactionFideliteRepository.findByUtilisateurId(2)).thenReturn(List.of(transaction));
        when(transactionFideliteMapper.versDTO(transaction)).thenReturn(transactionDTO);

        List<TransactionFideliteDTO> resultat = fidelisationService.recupererHistoriqueTransactions(2);

        assertThat(resultat).hasSize(1);
    }
}