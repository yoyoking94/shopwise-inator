package com.shopwise.backend.controller;

import com.shopwise.backend.dto.ConnexionDTO;
import com.shopwise.backend.dto.ConnexionReponseDTO;
import com.shopwise.backend.service.ConnexionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/connexion")
@RequiredArgsConstructor
public class ConnexionController {

    private final ConnexionService connexionService;

    @PostMapping
    public ResponseEntity<ConnexionReponseDTO> connecter(@Valid @RequestBody ConnexionDTO connexionDTO) {
        return ResponseEntity.ok(connexionService.connecter(connexionDTO));
    }
}
