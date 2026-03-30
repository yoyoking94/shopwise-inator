package com.shopwise.backend.service;

import com.shopwise.backend.dto.UtilisateurCreationDTO;
import com.shopwise.backend.dto.UtilisateurDTO;
import com.shopwise.backend.entities.PointsFidelite;
import com.shopwise.backend.entities.RoleUtilisateur;
import com.shopwise.backend.entities.Utilisateur;
import com.shopwise.backend.mapper.UtilisateurMapper;
import com.shopwise.backend.repository.PointsFideliteRepository;
import com.shopwise.backend.repository.UtilisateurRepository;
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
class UtilisateurServiceTest {

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @Mock
    private PointsFideliteRepository pointsFideliteRepository;

    @Mock
    private UtilisateurMapper utilisateurMapper;

    @InjectMocks
    private UtilisateurService utilisateurService;

    private Utilisateur utilisateur;
    private UtilisateurDTO utilisateurDTO;
    private UtilisateurCreationDTO utilisateurCreationDTO;

    @BeforeEach
    void initialiserDonnees() {
        utilisateur = new Utilisateur();
        utilisateur.setId(2);
        utilisateur.setNom("Alice");
        utilisateur.setEmail("alice@email.com");
        utilisateur.setMotDePasse("alice123");
        utilisateur.setRole(RoleUtilisateur.CLIENT);

        utilisateurDTO = new UtilisateurDTO();
        utilisateurDTO.setId(2);
        utilisateurDTO.setNom("Alice");
        utilisateurDTO.setEmail("alice@email.com");
        utilisateurDTO.setRole("CLIENT");

        utilisateurCreationDTO = new UtilisateurCreationDTO();
        utilisateurCreationDTO.setNom("Alice");
        utilisateurCreationDTO.setEmail("alice@email.com");
        utilisateurCreationDTO.setTelephone("0601020304");
    }

    @Test
    void recupererTousLesClients_retourneListe() {
        when(utilisateurRepository.findByRole(RoleUtilisateur.CLIENT)).thenReturn(List.of(utilisateur));
        when(utilisateurMapper.versDTO(utilisateur)).thenReturn(utilisateurDTO);

        List<UtilisateurDTO> resultat = utilisateurService.recupererTousLesClients();

        assertThat(resultat).hasSize(1);
        assertThat(resultat.get(0).getNom()).isEqualTo("Alice");
    }

    @Test
    void recupererUtilisateurParId_avecIdExistant_retourneDTO() {
        when(utilisateurRepository.findById(2)).thenReturn(Optional.of(utilisateur));
        when(utilisateurMapper.versDTO(utilisateur)).thenReturn(utilisateurDTO);

        UtilisateurDTO resultat = utilisateurService.recupererUtilisateurParId(2);

        assertThat(resultat.getId()).isEqualTo(2);
    }

    @Test
    void recupererUtilisateurParId_avecIdInexistant_lancheException() {
        when(utilisateurRepository.findById(99)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> utilisateurService.recupererUtilisateurParId(99))
                .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    void creerClient_creeUtilisateurEtPointsFidelite() {
        when(utilisateurMapper.versEntite(utilisateurCreationDTO)).thenReturn(utilisateur);
        when(utilisateurRepository.save(utilisateur)).thenReturn(utilisateur);
        when(utilisateurMapper.versDTO(utilisateur)).thenReturn(utilisateurDTO);

        UtilisateurDTO resultat = utilisateurService.creerClient(utilisateurCreationDTO);

        verify(pointsFideliteRepository, times(1)).save(any(PointsFidelite.class));
        assertThat(resultat.getMotDePasseTemporaire()).isNotNull();
    }

    @Test
    void mettreAJourClient_avecIdExistant_retourneClientMisAJour() {
        when(utilisateurRepository.findById(2)).thenReturn(Optional.of(utilisateur));
        when(utilisateurRepository.save(utilisateur)).thenReturn(utilisateur);
        when(utilisateurMapper.versDTO(utilisateur)).thenReturn(utilisateurDTO);

        UtilisateurDTO resultat = utilisateurService.mettreAJourClient(2, utilisateurCreationDTO);

        assertThat(resultat.getNom()).isEqualTo("Alice");
    }

    @Test
    void mettreAJourClient_avecIdInexistant_lancheException() {
        when(utilisateurRepository.findById(99)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> utilisateurService.mettreAJourClient(99, utilisateurCreationDTO))
                .isInstanceOf(EntityNotFoundException.class);
    }
}