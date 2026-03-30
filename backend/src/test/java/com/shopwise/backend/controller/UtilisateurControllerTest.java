package com.shopwise.backend.controller;

import tools.jackson.databind.ObjectMapper;
import com.shopwise.backend.dto.UtilisateurCreationDTO;
import com.shopwise.backend.dto.UtilisateurDTO;
import com.shopwise.backend.service.UtilisateurService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UtilisateurController.class)
class UtilisateurControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UtilisateurService utilisateurService;

    private UtilisateurDTO utilisateurDTO;
    private UtilisateurCreationDTO utilisateurCreationDTO;

    @BeforeEach
    void initialiserDonnees() {
        utilisateurDTO = new UtilisateurDTO();
        utilisateurDTO.setId(2);
        utilisateurDTO.setNom("Alice");
        utilisateurDTO.setEmail("alice@email.com");
        utilisateurDTO.setTelephone("0601020304");
        utilisateurDTO.setRole("CLIENT");

        utilisateurCreationDTO = new UtilisateurCreationDTO();
        utilisateurCreationDTO.setNom("Alice");
        utilisateurCreationDTO.setEmail("alice@email.com");
        utilisateurCreationDTO.setTelephone("0601020304");
    }

    @Test
    void recupererTousLesClients_retourne200AvecListe() throws Exception {
        when(utilisateurService.recupererTousLesClients()).thenReturn(List.of(utilisateurDTO));

        mockMvc.perform(get("/api/utilisateurs/clients"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nom").value("Alice"));
    }

    @Test
    void recupererUtilisateurParId_retourne200() throws Exception {
        when(utilisateurService.recupererUtilisateurParId(2)).thenReturn(utilisateurDTO);

        mockMvc.perform(get("/api/utilisateurs/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("alice@email.com"));
    }

    @Test
    void creerClient_avecDonneesValides_retourne201() throws Exception {
        utilisateurDTO.setMotDePasseTemporaire("abc12345");
        when(utilisateurService.creerClient(any())).thenReturn(utilisateurDTO);

        mockMvc.perform(post("/api/utilisateurs/clients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(utilisateurCreationDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.motDePasseTemporaire").value("abc12345"));
    }

    @Test
    void mettreAJourClient_retourne200() throws Exception {
        when(utilisateurService.mettreAJourClient(eq(2), any())).thenReturn(utilisateurDTO);

        mockMvc.perform(put("/api/utilisateurs/clients/2")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(utilisateurCreationDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nom").value("Alice"));
    }
}