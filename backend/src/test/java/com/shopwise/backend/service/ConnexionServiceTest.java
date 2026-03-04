package com.shopwise.backend.service;

import com.shopwise.backend.dto.ConnexionDTO;
import com.shopwise.backend.dto.ConnexionReponseDTO;
import com.shopwise.backend.entities.RoleUtilisateur;
import com.shopwise.backend.entities.Utilisateur;
import com.shopwise.backend.repository.UtilisateurRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ConnexionServiceTest {

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @InjectMocks
    private ConnexionService connexionService;

    private Utilisateur utilisateur;

    @BeforeEach
    void initialiser() {
        utilisateur = new Utilisateur();
        utilisateur.setId(1);
        utilisateur.setNom("Alice Martin");
        utilisateur.setEmail("alice@email.com");
        utilisateur.setMotDePasse("alice123");
        utilisateur.setRole(RoleUtilisateur.CLIENT);
    }

    @Test
    void connecter_avecIdentifiantsCorrects_retourneReponseConnexion() {
        ConnexionDTO connexionDTO = new ConnexionDTO();
        connexionDTO.setEmail("alice@email.com");
        connexionDTO.setMotDePasse("alice123");

        when(utilisateurRepository.findByEmail("alice@email.com")).thenReturn(Optional.of(utilisateur));

        ConnexionReponseDTO reponse = connexionService.connecter(connexionDTO);

        assertNotNull(reponse);
        assertEquals("Alice Martin", reponse.getNom());
        assertEquals("CLIENT", reponse.getRole());
    }

    @Test
    void connecter_avecEmailInconnu_leveException() {
        ConnexionDTO connexionDTO = new ConnexionDTO();
        connexionDTO.setEmail("inconnu@email.com");
        connexionDTO.setMotDePasse("motdepasse");

        when(utilisateurRepository.findByEmail("inconnu@email.com")).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> connexionService.connecter(connexionDTO));
    }

    @Test
    void connecter_avecMauvaisMotDePasse_leveException() {
        ConnexionDTO connexionDTO = new ConnexionDTO();
        connexionDTO.setEmail("alice@email.com");
        connexionDTO.setMotDePasse("mauvaisMotDePasse");

        when(utilisateurRepository.findByEmail("alice@email.com")).thenReturn(Optional.of(utilisateur));

        assertThrows(EntityNotFoundException.class, () -> connexionService.connecter(connexionDTO));
    }
}
