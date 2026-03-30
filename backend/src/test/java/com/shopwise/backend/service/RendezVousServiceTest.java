package com.shopwise.backend.service;

import com.shopwise.backend.dto.RendezVousDTO;
import com.shopwise.backend.entities.*;
import com.shopwise.backend.mapper.RendezVousMapper;
import com.shopwise.backend.repository.RendezVousRepository;
import com.shopwise.backend.repository.UtilisateurRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RendezVousServiceTest {

    @Mock
    private RendezVousRepository rendezVousRepository;

    @Mock
    private RendezVousMapper rendezVousMapper;

    @Mock
    private FidelisationService fidelisationService;

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @InjectMocks
    private RendezVousService rendezVousService;

    private Utilisateur utilisateur;
    private RendezVous rendezVous;
    private RendezVousDTO rendezVousDTO;

    @BeforeEach
    void initialiserDonnees() {
        utilisateur = new Utilisateur();
        utilisateur.setId(2);
        utilisateur.setNom("Alice");
        utilisateur.setEmail("alice@email.com");
        utilisateur.setMotDePasse("alice123");
        utilisateur.setRole(RoleUtilisateur.CLIENT);

        rendezVous = new RendezVous();
        rendezVous.setId(1);
        rendezVous.setUtilisateur(utilisateur);
        rendezVous.setStatut(StatutRendezVous.EN_ATTENTE);

        rendezVousDTO = new RendezVousDTO();
        rendezVousDTO.setId(1);
        rendezVousDTO.setClientId(2);
        rendezVousDTO.setStatut("EN_ATTENTE");
    }

    @Test
    void recupererTousLesRendezVous_retourneListe() {
        when(rendezVousRepository.findAll()).thenReturn(List.of(rendezVous));
        when(rendezVousMapper.versDTO(rendezVous)).thenReturn(rendezVousDTO);

        List<RendezVousDTO> resultat = rendezVousService.recupererTousLesRendezVous();

        assertThat(resultat).hasSize(1);
    }

    @Test
    void filtrerParStatut_avecStatutValide_retourneListe() {
        when(rendezVousRepository.findByStatut(StatutRendezVous.EN_ATTENTE)).thenReturn(List.of(rendezVous));
        when(rendezVousMapper.versDTO(rendezVous)).thenReturn(rendezVousDTO);

        List<RendezVousDTO> resultat = rendezVousService.filtrerParStatut("EN_ATTENTE");

        assertThat(resultat).hasSize(1);
    }

    @Test
    void filtrerParStatut_avecStatutInvalide_lancheException() {
        assertThatThrownBy(() -> rendezVousService.filtrerParStatut("STATUT_INEXISTANT"))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void filtrerParDate_retourneListe() {
        LocalDate date = LocalDate.of(2026, 3, 5);
        when(rendezVousRepository.findByDateRendezVous(date)).thenReturn(List.of(rendezVous));
        when(rendezVousMapper.versDTO(rendezVous)).thenReturn(rendezVousDTO);

        List<RendezVousDTO> resultat = rendezVousService.filtrerParDate(date);

        assertThat(resultat).hasSize(1);
    }

    @Test
    void filtrerParClient_retourneListe() {
        when(rendezVousRepository.findByUtilisateurId(2)).thenReturn(List.of(rendezVous));
        when(rendezVousMapper.versDTO(rendezVous)).thenReturn(rendezVousDTO);

        List<RendezVousDTO> resultat = rendezVousService.filtrerParClient(2);

        assertThat(resultat).hasSize(1);
    }

    @Test
    void creerRendezVous_avecClientExistant_retourneDTO() {
        when(utilisateurRepository.findById(2)).thenReturn(Optional.of(utilisateur));
        when(rendezVousMapper.versEntite(rendezVousDTO)).thenReturn(rendezVous);
        when(rendezVousRepository.save(rendezVous)).thenReturn(rendezVous);
        when(rendezVousMapper.versDTO(rendezVous)).thenReturn(rendezVousDTO);

        RendezVousDTO resultat = rendezVousService.creerRendezVous(rendezVousDTO);

        assertThat(resultat.getClientId()).isEqualTo(2);
    }

    @Test
    void creerRendezVous_avecClientInexistant_lancheException() {
        when(utilisateurRepository.findById(99)).thenReturn(Optional.empty());
        rendezVousDTO.setClientId(99);

        assertThatThrownBy(() -> rendezVousService.creerRendezVous(rendezVousDTO))
                .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    void changerStatut_versHonore_attribueDesPoints() {
        rendezVous.setStatut(StatutRendezVous.EN_ATTENTE);
        when(rendezVousRepository.findById(1)).thenReturn(Optional.of(rendezVous));
        when(rendezVousRepository.save(rendezVous)).thenReturn(rendezVous);
        when(rendezVousMapper.versDTO(rendezVous)).thenReturn(rendezVousDTO);

        rendezVousService.changerStatut(1, "HONORE");

        verify(fidelisationService, times(1)).attribuerPoints(rendezVous);
    }

    @Test
    void changerStatut_dejahHonore_nAttribuePasDePointsDeNouveaux() {
        rendezVous.setStatut(StatutRendezVous.HONORE);
        when(rendezVousRepository.findById(1)).thenReturn(Optional.of(rendezVous));
        when(rendezVousRepository.save(rendezVous)).thenReturn(rendezVous);
        when(rendezVousMapper.versDTO(rendezVous)).thenReturn(rendezVousDTO);

        rendezVousService.changerStatut(1, "HONORE");

        verify(fidelisationService, never()).attribuerPoints(any());
    }

    @Test
    void changerStatut_avecIdInexistant_lancheException() {
        when(rendezVousRepository.findById(99)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> rendezVousService.changerStatut(99, "HONORE"))
                .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    void changerStatut_avecStatutInvalide_lancheException() {
        when(rendezVousRepository.findById(1)).thenReturn(Optional.of(rendezVous));

        assertThatThrownBy(() -> rendezVousService.changerStatut(1, "STATUT_INVALIDE"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Statut invalide");
    }
}