package com.shopwise.backend.controller;

import com.shopwise.backend.dto.TransactionFideliteDTO;
import com.shopwise.backend.service.FidelisationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FidelisationController.class)
class FidelisationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private FidelisationService fidelisationService;

    @Test
    void recupererSoldePoints_retourne200AvecSolde() throws Exception {
        when(fidelisationService.recupererSoldePoints(2)).thenReturn(10);

        mockMvc.perform(get("/api/fidelisation/clients/2/solde"))
                .andExpect(status().isOk())
                .andExpect(content().string("10"));
    }

    @Test
    void recupererHistoriqueTransactions_retourne200AvecListe() throws Exception {
        TransactionFideliteDTO transactionDTO = new TransactionFideliteDTO();
        transactionDTO.setClientId(2);
        transactionDTO.setPointsAttribues(10);

        when(fidelisationService.recupererHistoriqueTransactions(2)).thenReturn(List.of(transactionDTO));

        mockMvc.perform(get("/api/fidelisation/clients/2/historique"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].pointsAttribues").value(10));
    }
}