package com.shopwise.backend.mapper;

import com.shopwise.backend.dto.UtilisateurCreationDTO;
import com.shopwise.backend.dto.UtilisateurDTO;
import com.shopwise.backend.entities.RoleUtilisateur;
import com.shopwise.backend.entities.Utilisateur;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import static org.junit.jupiter.api.Assertions.*;

class UtilisateurMapperTest {

    private UtilisateurMapper mapper;
    private Utilisateur utilisateur;
    private UtilisateurDTO dto;
    private UtilisateurCreationDTO creationDTO;

    @BeforeEach
    void setUp() {
        mapper = Mappers.getMapper(UtilisateurMapper.class);

        utilisateur = new Utilisateur();
        utilisateur.setId(1);
        utilisateur.setNom("Alice");
        utilisateur.setEmail("alice@test.com");
        utilisateur.setTelephone("0600000000");
        utilisateur.setRole(RoleUtilisateur.CLIENT);

        dto = new UtilisateurDTO();
        dto.setId(1);
        dto.setNom("Alice");
        dto.setEmail("alice@test.com");
        dto.setTelephone("0600000000");
        // motDePasseTemporaire = null (ignored)

        creationDTO = new UtilisateurCreationDTO();
        creationDTO.setNom("Bob");
        creationDTO.setEmail("bob@test.com");
        creationDTO.setTelephone("0700000000");
    }

    @Test
    void versDTO_ignoreMotDePasseTemporaire() {
        UtilisateurDTO result = mapper.versDTO(utilisateur);

        assertNull(result.getMotDePasseTemporaire()); // Ignoré !
        assertEquals("CLIENT", result.getRole());
        assertEquals("alice@test.com", result.getEmail());
    }

    @Test
    void versEntite_ignoreChamps() {
        UtilisateurCreationDTO creationDTO = new UtilisateurCreationDTO();
        creationDTO.setNom("Bob");
        creationDTO.setEmail("bob@test.com");

        Utilisateur result = mapper.versEntite(creationDTO);

        // Vérifie ignores EXPLICITES (pas dateCreation auto)
        assertNull(result.getId()); // ✅ Ignoré
        assertNull(result.getMotDePasse()); // ✅ Ignoré
        assertNull(result.getRole()); // ✅ Ignoré

        // dateCreation = auto NOW → OK, pas assert null
        assertEquals("Bob", result.getNom());
        assertEquals("bob@test.com", result.getEmail());
    }

}
