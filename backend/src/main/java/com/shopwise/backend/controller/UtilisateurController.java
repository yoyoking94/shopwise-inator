package com.shopwise.backend.controller;

import com.shopwise.backend.dto.UtilisateurCreationDTO;
import com.shopwise.backend.dto.UtilisateurDTO;
import com.shopwise.backend.service.UtilisateurService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
@RequiredArgsConstructor
public class UtilisateurController {

    private final UtilisateurService utilisateurService;

    @GetMapping("/clients")
    public ResponseEntity<List<UtilisateurDTO>> recupererTousLesClients() {
        return ResponseEntity.ok(utilisateurService.recupererTousLesClients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> recupererUtilisateurParId(@PathVariable Integer id) {
        return ResponseEntity.ok(utilisateurService.recupererUtilisateurParId(id));
    }

    @PostMapping("/clients")
    public ResponseEntity<UtilisateurDTO> creerClient(
            @Valid @RequestBody UtilisateurCreationDTO utilisateurCreationDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(utilisateurService.creerClient(utilisateurCreationDTO));
    }

    @PutMapping("/clients/{id}")
    public ResponseEntity<UtilisateurDTO> mettreAJourClient(@PathVariable Integer id,
            @Valid @RequestBody UtilisateurCreationDTO utilisateurCreationDTO) {
        return ResponseEntity.ok(utilisateurService.mettreAJourClient(id, utilisateurCreationDTO));
    }
}
