package com.shopwise.backend.service;

import com.shopwise.backend.dto.UtilisateurCreationDTO;
import com.shopwise.backend.dto.UtilisateurDTO;
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

import static org.junit.jupiter.api.Assertions.*;
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

    @BeforeEach
    void initialiser() {
        utilisateur = new Utilisateur();
        utilisateur.setId(1);
        utilisateur.setNom("Alice Martin");
        utilisateur.setEmail("alice@email.com");
        utilisateur.setTelephone("0601020304");
        utilisateur.setRole(RoleUtilisateur.CLIENT);

        utilisateurDTO = new UtilisateurDTO();
        utilisateurDTO.setId(1);
        utilisateurDTO.setNom("Alice Martin");
        utilisateurDTO.setEmail("alice@email.com");
        utilisateurDTO.setTelephone("0601020304");
        utilisateurDTO.setRole("CLIENT");
    }

    @Test
    void recupererTousLesClients_retourneListe() {
        when(utilisateurRepository.findByRole(RoleUtilisateur.CLIENT)).thenReturn(List.of(utilisateur));
        when(utilisateurMapper.versDTO(utilisateur)).thenReturn(utilisateurDTO);

        List<UtilisateurDTO> resultat = utilisateurService.recupererTousLesClients();

        assertEquals(1, resultat.size());
        assertEquals("Alice Martin", resultat.get(0).getNom());
    }

    @Test
    void recupererUtilisateurParId_avecIdExistant_retourneDTO() {
        when(utilisateurRepository.findById(1)).thenReturn(Optional.of(utilisateur));
        when(utilisateurMapper.versDTO(utilisateur)).thenReturn(utilisateurDTO);

        UtilisateurDTO resultat = utilisateurService.recupererUtilisateurParId(1);

        assertNotNull(resultat);
        assertEquals("alice@email.com", resultat.getEmail());
    }

    @Test
    void recupererUtilisateurParId_avecIdInexistant_leveException() {
        when(utilisateurRepository.findById(99)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> utilisateurService.recupererUtilisateurParId(99));
    }

    @Test
    void creerClient_genereMotDePasseEtCreePointsFidelite() {
        UtilisateurCreationDTO creationDTO = new UtilisateurCreationDTO();
        creationDTO.setNom("Bob Durand");
        creationDTO.setEmail("bob@email.com");

        when(utilisateurMapper.versEntite(creationDTO)).thenReturn(utilisateur);
        when(utilisateurRepository.save(any())).thenReturn(utilisateur);
        when(utilisateurMapper.versDTO(utilisateur)).thenReturn(utilisateurDTO);

        UtilisateurDTO resultat = utilisateurService.creerClient(creationDTO);

        assertNotNull(resultat);
        verify(pointsFideliteRepository, times(1)).save(any());
    }

    @Test
    void mettreAJourClient_avecIdExistant_metsAJourLesChamps() {
        UtilisateurCreationDTO creationDTO = new UtilisateurCreationDTO();
        creationDTO.setNom("Alice Modifiee");
        creationDTO.setEmail("alice.modifiee@email.com");
        creationDTO.setTelephone("0699999999");

        when(utilisateurRepository.findById(1)).thenReturn(Optional.of(utilisateur));
        when(utilisateurRepository.save(utilisateur)).thenReturn(utilisateur);
        when(utilisateurMapper.versDTO(utilisateur)).thenReturn(utilisateurDTO);

        utilisateurService.mettreAJourClient(1, creationDTO);

        verify(utilisateurRepository, times(1)).save(utilisateur);
        assertEquals("Alice Modifiee", utilisateur.getNom());
    }

    @Test
    void mettreAJourClient_avecIdInexistant_leveException() {
        UtilisateurCreationDTO creationDTO = new UtilisateurCreationDTO();
        when(utilisateurRepository.findById(99)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> utilisateurService.mettreAJourClient(99, creationDTO));
    }

    @Test
    void creerClient_emailDuplique_gereContrainteUnique() {
        UtilisateurCreationDTO dto = new UtilisateurCreationDTO();
        dto.setNom("Bob");
        dto.setEmail("duplicate@email.com");

        when(utilisateurMapper.versEntite(dto)).thenReturn(utilisateur);
        when(utilisateurRepository.save(any(Utilisateur.class)))
                .thenThrow(new RuntimeException("Duplicate entry"));

        assertThrows(RuntimeException.class, () -> utilisateurService.creerClient(dto));
    }

}
