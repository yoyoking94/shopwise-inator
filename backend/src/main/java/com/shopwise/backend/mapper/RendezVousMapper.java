package com.shopwise.backend.mapper;

import com.shopwise.backend.dto.RendezVousDTO;
import com.shopwise.backend.entities.RendezVous;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RendezVousMapper {

    @Mapping(source = "client.id", target = "clientId")
    @Mapping(source = "statut", target = "statut")
    RendezVousDTO versDTO(RendezVous rendezVous);

    @Mapping(source = "clientId", target = "client.id")
    RendezVous versEntite(RendezVousDTO rendezVousDTO);
}
