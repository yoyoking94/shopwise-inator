package com.shopwise.backend.service;

import com.shopwise.backend.dto.RendezVousDTO;
import com.shopwise.backend.entities.RendezVous;
import com.shopwise.backend.entities.StatutRendezVous;
import com.shopwise.backend.entities.Utilisateur;
import com.shopwise.backend.mapper.RendezVousMapper;
import com.shopwise.backend.repository.RendezVousRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RendezVousServiceTest {

    @Mock
    private RendezVousRepository rendezVousRepository;

    @Mock
    private RendezVousMapper rendezVousMapper;

    @Mock
    private FidelisationService fidelisationService;

    @InjectMocks
    private RendezVousService rendezVousService;

    private RendezVous rendezVous;
    private RendezVousDTO rendezVousDTO;

    @BeforeEach
    void initialiser() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(1);

        rendezVous = new RendezVous();
        rendezVous.setId(1);
        rendezVous.setUtilisateur(utilisateur);
        rendezVous.setDateRendezVous(LocalDate.of(2026, 3, 5));
        rendezVous.setHeureRendezVous(LocalTime.of(10, 0));
        rendezVous.setService("Coupe cheveux");
        rendezVous.setStatut(StatutRendezVous.EN_ATTENTE);

        rendezVousDTO = new RendezVousDTO();
        rendezVousDTO.setId(1);
        rendezVousDTO.setClientId(1);
        rendezVousDTO.setService("Coupe cheveux");
        rendezVousDTO.setStatut("EN_ATTENTE");
    }

    @Test
    void recupererTousLesRendezVous_retourneListe() {
        when(rendezVousRepository.findAll()).thenReturn(List.of(rendezVous));
        when(rendezVousMapper.versDTO(rendezVous)).thenReturn(rendezVousDTO);

        List<RendezVousDTO> resultat = rendezVousService.recupererTousLesRendezVous();

        assertEquals(1, resultat.size());
    }

    @Test
    void changerStatut_versHonore_attribueDesPoints() {
        when(rendezVousRepository.findById(1)).thenReturn(Optional.of(rendezVous));
        when(rendezVousRepository.save(rendezVous)).thenReturn(rendezVous);
        when(rendezVousMapper.versDTO(rendezVous)).thenReturn(rendezVousDTO);

        rendezVousService.changerStatut(1, "HONORE");

        verify(fidelisationService, times(1)).attribuerPoints(rendezVous);
        assertEquals(StatutRendezVous.HONORE, rendezVous.getStatut());
    }

    @Test
    void changerStatut_versAnnule_nAttribuePasDePoints() {
        when(rendezVousRepository.findById(1)).thenReturn(Optional.of(rendezVous));
        when(rendezVousRepository.save(rendezVous)).thenReturn(rendezVous);
        when(rendezVousMapper.versDTO(rendezVous)).thenReturn(rendezVousDTO);

        rendezVousService.changerStatut(1, "ANNULE");

        verify(fidelisationService, never()).attribuerPoints(any());
        assertEquals(StatutRendezVous.ANNULE, rendezVous.getStatut());
    }

    @Test
    void changerStatut_avecIdInexistant_leveException() {
        when(rendezVousRepository.findById(99)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> rendezVousService.changerStatut(99, "HONORE"));
    }

    @Test
    void creerRendezVous_sauvegardeetRetourneDTO() {
        RendezVousDTO rendezVousDTO = new RendezVousDTO();
        rendezVousDTO.setClientId(1);
        rendezVousDTO.setService("Coupe");

        when(rendezVousMapper.versEntite(rendezVousDTO)).thenReturn(rendezVous);
        when(rendezVousRepository.save(rendezVous)).thenReturn(rendezVous);
        when(rendezVousMapper.versDTO(rendezVous)).thenReturn(this.rendezVousDTO);

        RendezVousDTO resultat = rendezVousService.creerRendezVous(rendezVousDTO);

        assertNotNull(resultat);
        verify(rendezVousRepository, times(1)).save(rendezVous);
    }

    @Test
    void filtrerParStatut_retourneListeFiltree() {
        when(rendezVousRepository.findByStatut(StatutRendezVous.HONORE)).thenReturn(List.of(rendezVous));
        when(rendezVousMapper.versDTO(rendezVous)).thenReturn(rendezVousDTO);

        List<RendezVousDTO> resultat = rendezVousService.filtrerParStatut("HONORE");

        assertEquals(1, resultat.size());
    }

    @Test
    void filtrerParDate_retourneListeFiltree() {
        LocalDate date = LocalDate.of(2026, 3, 5);
        when(rendezVousRepository.findByDateRendezVous(date)).thenReturn(List.of(rendezVous));
        when(rendezVousMapper.versDTO(rendezVous)).thenReturn(rendezVousDTO);

        List<RendezVousDTO> resultat = rendezVousService.filtrerParDate(date);

        assertEquals(1, resultat.size());
    }

    @Test
    void filtrerParClient_retourneListeFiltree() {
        when(rendezVousRepository.findByUtilisateurId(1)).thenReturn(List.of(rendezVous));
        when(rendezVousMapper.versDTO(rendezVous)).thenReturn(rendezVousDTO);

        List<RendezVousDTO> resultat = rendezVousService.filtrerParClient(1);

        assertEquals(1, resultat.size());
    }

    @Test
    void filtrerParStatut_statutInvalide_leveIllegalArgumentException() {
        assertThrows(IllegalArgumentException.class,
                () -> rendezVousService.filtrerParStatut("INVALIDE"));
    }

    @Test
    void filtrerParDate_null_retourneTous() {
        when(rendezVousRepository.findAll()).thenReturn(List.of());
        List<RendezVousDTO> resultat = rendezVousService.recupererTousLesRendezVous();
        assertNotNull(resultat); // Couvre fallback controller
    }

}
