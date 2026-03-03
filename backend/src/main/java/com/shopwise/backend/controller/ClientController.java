package com.shopwise.backend.controller;

import com.shopwise.backend.dto.ClientDTO;
import com.shopwise.backend.service.ClientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @GetMapping
    public ResponseEntity<List<ClientDTO>> recupererTousLesClients() {
        return ResponseEntity.ok(clientService.recupererTousLesClients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDTO> recupererClientParId(@PathVariable Integer id) {
        return ResponseEntity.ok(clientService.recupererClientParId(id));
    }

    @PostMapping
    public ResponseEntity<ClientDTO> creerClient(@Valid @RequestBody ClientDTO clientDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clientService.creerClient(clientDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientDTO> mettreAJourClient(@PathVariable Integer id,
            @Valid @RequestBody ClientDTO clientDTO) {
        return ResponseEntity.ok(clientService.mettreAJourClient(id, clientDTO));
    }
}
