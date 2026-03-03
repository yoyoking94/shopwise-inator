package com.shopwise.backend.controller;

import com.shopwise.backend.dto.TransactionFideliteDTO;
import com.shopwise.backend.service.FidelisationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/fidelisation")
@RequiredArgsConstructor
public class FidelisationController {

    private final FidelisationService fidelisationService;

    @GetMapping("/clients/{clientId}/solde")
    public ResponseEntity<Integer> recupererSoldePoints(@PathVariable Integer clientId) {
        return ResponseEntity.ok(fidelisationService.recupererSoldePoints(clientId));
    }

    @GetMapping("/clients/{clientId}/historique")
    public ResponseEntity<List<TransactionFideliteDTO>> recupererHistoriqueTransactions(
            @PathVariable Integer clientId) {
        return ResponseEntity.ok(fidelisationService.recupererHistoriqueTransactions(clientId));
    }
}
