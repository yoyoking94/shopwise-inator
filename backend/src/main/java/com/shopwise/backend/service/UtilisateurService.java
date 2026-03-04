package com.shopwise.backend.service;

import com.shopwise.backend.dto.UtilisateurCreationDTO;
import com.shopwise.backend.dto.UtilisateurDTO;
import com.shopwise.backend.entities.PointsFidelite;
import com.shopwise.backend.entities.RoleUtilisateur;
import com.shopwise.backend.entities.Utilisateur;
import com.shopwise.backend.mapper.UtilisateurMapper;
import com.shopwise.backend.repository.PointsFideliteRepository;
import com.shopwise.backend.repository.UtilisateurRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final PointsFideliteRepository pointsFideliteRepository;
    private final UtilisateurMapper utilisateurMapper;

    public List<UtilisateurDTO> recupererTousLesClients() {
        return utilisateurRepository.findByRole(RoleUtilisateur.CLIENT)
                .stream()
                .map(utilisateurMapper::versDTO)
                .toList();
    }

    public UtilisateurDTO recupererUtilisateurParId(Integer id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur introuvable avec l'id : " + id));
        return utilisateurMapper.versDTO(utilisateur);
    }

    public UtilisateurDTO creerClient(UtilisateurCreationDTO utilisateurCreationDTO) {
        Utilisateur utilisateur = utilisateurMapper.versEntite(utilisateurCreationDTO);

        String motDePasseTemporaire = UUID.randomUUID().toString().substring(0, 8);
        utilisateur.setMotDePasse(motDePasseTemporaire);
        utilisateur.setRole(RoleUtilisateur.CLIENT);

        Utilisateur utilisateurSauvegarde = utilisateurRepository.save(utilisateur);

        PointsFidelite pointsFidelite = new PointsFidelite();
        pointsFidelite.setUtilisateur(utilisateurSauvegarde);
        pointsFidelite.setSoldePoints(0);
        pointsFideliteRepository.save(pointsFidelite);

        UtilisateurDTO utilisateurDTO = utilisateurMapper.versDTO(utilisateurSauvegarde);
        utilisateurDTO.setMotDePasseTemporaire(motDePasseTemporaire);
        return utilisateurDTO;
    }

    public UtilisateurDTO mettreAJourClient(Integer id, UtilisateurCreationDTO utilisateurCreationDTO) {
        Utilisateur utilisateurExistant = utilisateurRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur introuvable avec l'id : " + id));

        utilisateurExistant.setNom(utilisateurCreationDTO.getNom());
        utilisateurExistant.setEmail(utilisateurCreationDTO.getEmail());
        utilisateurExistant.setTelephone(utilisateurCreationDTO.getTelephone());

        return utilisateurMapper.versDTO(utilisateurRepository.save(utilisateurExistant));
    }
}
