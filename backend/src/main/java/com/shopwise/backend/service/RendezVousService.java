package com.shopwise.backend.service;

import com.shopwise.backend.dto.RendezVousDTO;
import com.shopwise.backend.entities.RendezVous;
import com.shopwise.backend.entities.StatutRendezVous;
import com.shopwise.backend.mapper.RendezVousMapper;
import com.shopwise.backend.repository.RendezVousRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RendezVousService {

    private final RendezVousRepository rendezVousRepository;
    private final RendezVousMapper rendezVousMapper;

    public List<RendezVousDTO> recupererTousLesRendezVous() {
        return rendezVousRepository.findAll()
                .stream()
                .map(rendezVousMapper::versDTO)
                .toList();
    }

    public List<RendezVousDTO> filtrerParStatut(String statut) {
        StatutRendezVous statutEnum = StatutRendezVous.valueOf(statut.toUpperCase());
        return rendezVousRepository.findByStatut(statutEnum)
                .stream()
                .map(rendezVousMapper::versDTO)
                .toList();
    }

    public List<RendezVousDTO> filtrerParDate(LocalDate date) {
        return rendezVousRepository.findByDateRendezVous(date)
                .stream()
                .map(rendezVousMapper::versDTO)
                .toList();
    }

    public List<RendezVousDTO> filtrerParClient(Integer clientId) {
        return rendezVousRepository.findByClientId(clientId)
                .stream()
                .map(rendezVousMapper::versDTO)
                .toList();
    }

    public RendezVousDTO creerRendezVous(RendezVousDTO rendezVousDTO) {
        RendezVous rendezVous = rendezVousMapper.versEntite(rendezVousDTO);
        return rendezVousMapper.versDTO(rendezVousRepository.save(rendezVous));
    }

    public RendezVousDTO changerStatut(Integer id, String nouveauStatut) {
        RendezVous rendezVous = rendezVousRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rendez-vous introuvable avec l'id : " + id));

        StatutRendezVous statutEnum = StatutRendezVous.valueOf(nouveauStatut.toUpperCase());
        rendezVous.setStatut(statutEnum);
        RendezVous rendezVousSauvegarde = rendezVousRepository.save(rendezVous);

        return rendezVousMapper.versDTO(rendezVousSauvegarde);
    }
}
