package com.shopwise.backend.service;

import com.shopwise.backend.dto.ConnexionDTO;
import com.shopwise.backend.dto.ConnexionReponseDTO;
import com.shopwise.backend.entities.Utilisateur;
import com.shopwise.backend.repository.UtilisateurRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConnexionService {

    private final UtilisateurRepository utilisateurRepository;

    public ConnexionReponseDTO connecter(ConnexionDTO connexionDTO) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(connexionDTO.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("Email ou mot de passe incorrect"));

        if (!utilisateur.getMotDePasse().equals(connexionDTO.getMotDePasse())) {
            throw new EntityNotFoundException("Email ou mot de passe incorrect");
        }

        return new ConnexionReponseDTO(
                utilisateur.getId(),
                utilisateur.getNom(),
                utilisateur.getEmail(),
                utilisateur.getRole().name());
    }
}
