package com.shopwise.backend.mapper;

import com.shopwise.backend.dto.ClientDTO;
import com.shopwise.backend.entities.Client;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClientMapper {

    ClientDTO versDTO(Client client);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "dateCreation", ignore = true)
    Client versEntiteDepuisDTO(ClientDTO clientDTO);
}
