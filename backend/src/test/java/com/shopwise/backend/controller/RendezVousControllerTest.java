package com.shopwise.backend.controller;

import tools.jackson.databind.ObjectMapper;
import com.shopwise.backend.dto.RendezVousDTO;
import com.shopwise.backend.service.RendezVousService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RendezVousController.class)
class RendezVousControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private RendezVousService rendezVousService;

    private RendezVousDTO rendezVousDTO;

    @BeforeEach
    void initialiserRendezVous() {
        rendezVousDTO = new RendezVousDTO();
        rendezVousDTO.setId(1);
        rendezVousDTO.setClientId(2);
        rendezVousDTO.setDateRendezVous(LocalDate.of(2026, 4, 10));
        rendezVousDTO.setHeureRendezVous(LocalTime.of(10, 0));
        rendezVousDTO.setService("Coupe cheveux");
        rendezVousDTO.setStatut("EN_ATTENTE");
    }

    @Test
    void recupererTousLesRendezVous_sansFiltre_retourne200() throws Exception {
        when(rendezVousService.recupererTousLesRendezVous()).thenReturn(List.of(rendezVousDTO));

        mockMvc.perform(get("/api/rendez-vous"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].service").value("Coupe cheveux"));
    }

    @Test
    void recupererTousLesRendezVous_avecFiltreStatut_retourne200() throws Exception {
        when(rendezVousService.filtrerParStatut("EN_ATTENTE")).thenReturn(List.of(rendezVousDTO));

        mockMvc.perform(get("/api/rendez-vous").param("statut", "EN_ATTENTE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].statut").value("EN_ATTENTE"));
    }

    @Test
    void recupererTousLesRendezVous_avecFiltreDate_retourne200() throws Exception {
        when(rendezVousService.filtrerParDate(LocalDate.of(2026, 4, 10))).thenReturn(List.of(rendezVousDTO));

        mockMvc.perform(get("/api/rendez-vous").param("date", "2026-04-10"))
                .andExpect(status().isOk());
    }

    @Test
    void recupererTousLesRendezVous_avecFiltreClient_retourne200() throws Exception {
        when(rendezVousService.filtrerParClient(2)).thenReturn(List.of(rendezVousDTO));

        mockMvc.perform(get("/api/rendez-vous").param("clientId", "2"))
                .andExpect(status().isOk());
    }

    @Test
    void creerRendezVous_avecDonneesValides_retourne201() throws Exception {
        when(rendezVousService.creerRendezVous(any())).thenReturn(rendezVousDTO);

        mockMvc.perform(post("/api/rendez-vous")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(rendezVousDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.service").value("Coupe cheveux"));
    }

    @Test
    void changerStatut_retourne200() throws Exception {
        rendezVousDTO.setStatut("HONORE");
        when(rendezVousService.changerStatut(1, "HONORE")).thenReturn(rendezVousDTO);

        mockMvc.perform(patch("/api/rendez-vous/1/statut")
                .param("statut", "HONORE"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.statut").value("HONORE"));
    }
}