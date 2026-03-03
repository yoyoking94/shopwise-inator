package com.shopwise.backend.controller;

import com.shopwise.backend.dto.RendezVousDTO;
import com.shopwise.backend.service.RendezVousService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rendez-vous")
@RequiredArgsConstructor
public class RendezVousController {

    private final RendezVousService rendezVousService;

    @GetMapping
    public ResponseEntity<List<RendezVousDTO>> recupererTousLesRendezVous(
            @RequestParam(required = false) String statut,
            @RequestParam(required = false) LocalDate date,
            @RequestParam(required = false) Integer clientId) {

        if (statut != null) {
            return ResponseEntity.ok(rendezVousService.filtrerParStatut(statut));
        }
        if (date != null) {
            return ResponseEntity.ok(rendezVousService.filtrerParDate(date));
        }
        if (clientId != null) {
            return ResponseEntity.ok(rendezVousService.filtrerParClient(clientId));
        }
        return ResponseEntity.ok(rendezVousService.recupererTousLesRendezVous());
    }

    @PostMapping
    public ResponseEntity<RendezVousDTO> creerRendezVous(@Valid @RequestBody RendezVousDTO rendezVousDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(rendezVousService.creerRendezVous(rendezVousDTO));
    }

    @PatchMapping("/{id}/statut")
    public ResponseEntity<RendezVousDTO> changerStatut(@PathVariable Integer id, @RequestParam String statut) {
        return ResponseEntity.ok(rendezVousService.changerStatut(id, statut));
    }
}
