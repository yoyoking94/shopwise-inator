package com.shopwise.backend.mapper;

import com.shopwise.backend.dto.UtilisateurCreationDTO;
import com.shopwise.backend.dto.UtilisateurDTO;
import com.shopwise.backend.entities.Utilisateur;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UtilisateurMapper {

    UtilisateurDTO versDTO(Utilisateur utilisateur);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "dateCreation", ignore = true)
    @Mapping(target = "motDePasse", ignore = true)
    @Mapping(target = "role", ignore = true)
    Utilisateur versEntite(UtilisateurCreationDTO utilisateurCreationDTO);
}
