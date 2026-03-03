package com.shopwise.backend.service;

import com.shopwise.backend.dto.ClientDTO;
import com.shopwise.backend.entities.Client;
import com.shopwise.backend.mapper.ClientMapper;
import com.shopwise.backend.repository.ClientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    public List<ClientDTO> recupererTousLesClients() {
        return clientRepository.findAll()
                .stream()
                .map(clientMapper::versDTO)
                .toList();
    }

    public ClientDTO recupererClientParId(Integer id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client introuvable avec l'id : " + id));
        return clientMapper.versDTO(client);
    }

    public ClientDTO creerClient(ClientDTO clientDTO) {
        Client client = clientMapper.versEntiteDepuisDTO(clientDTO);
        Client clientSauvegarde = clientRepository.save(client);

        return clientMapper.versDTO(clientSauvegarde);
    }

    public ClientDTO mettreAJourClient(Integer id, ClientDTO clientDTO) {
        Client clientExistant = clientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client introuvable avec l'id : " + id));

        clientExistant.setNom(clientDTO.getNom());
        clientExistant.setEmail(clientDTO.getEmail());
        clientExistant.setTelephone(clientDTO.getTelephone());

        return clientMapper.versDTO(clientRepository.save(clientExistant));
    }
}
