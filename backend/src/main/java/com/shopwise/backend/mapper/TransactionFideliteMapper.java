package com.shopwise.backend.mapper;

import com.shopwise.backend.dto.TransactionFideliteDTO;
import com.shopwise.backend.entities.TransactionFidelite;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TransactionFideliteMapper {

    @Mapping(source = "client.id", target = "clientId")
    @Mapping(source = "rendezVous.id", target = "rendezVousId")
    TransactionFideliteDTO versDTO(TransactionFidelite transactionFidelite);
}
