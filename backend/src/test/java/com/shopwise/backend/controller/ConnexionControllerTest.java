package com.shopwise.backend.controller;

import tools.jackson.databind.ObjectMapper;
import com.shopwise.backend.dto.ConnexionDTO;
import com.shopwise.backend.dto.ConnexionReponseDTO;
import com.shopwise.backend.service.ConnexionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ConnexionController.class)
class ConnexionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ConnexionService connexionService;

    @Test
    void connecter_avecIdentifiantsValides_retourne200() throws Exception {
        ConnexionDTO connexionDTO = new ConnexionDTO();
        connexionDTO.setEmail("alice@email.com");
        connexionDTO.setMotDePasse("alice123");

        ConnexionReponseDTO reponse = new ConnexionReponseDTO(2, "Alice", "alice@email.com", "CLIENT");

        when(connexionService.connecter(any())).thenReturn(reponse);

        mockMvc.perform(post("/api/connexion")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(connexionDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nom").value("Alice"))
                .andExpect(jsonPath("$.role").value("CLIENT"));
    }

    @Test
    void connecter_avecEmailManquant_retourne400() throws Exception {
        ConnexionDTO connexionDTO = new ConnexionDTO();
        connexionDTO.setMotDePasse("alice123");

        mockMvc.perform(post("/api/connexion")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(connexionDTO)))
                .andExpect(status().isBadRequest());
    }
}