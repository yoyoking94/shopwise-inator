package com.shopwise.backend.mapper;

import com.shopwise.backend.dto.TransactionFideliteDTO;
import com.shopwise.backend.entities.RendezVous;
import com.shopwise.backend.entities.TransactionFidelite;
import com.shopwise.backend.entities.Utilisateur;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import static org.junit.jupiter.api.Assertions.*;

class TransactionFideliteMapperTest {
    
    private TransactionFideliteMapper mapper;
    private TransactionFidelite transaction;
    private TransactionFideliteDTO dto;
    
    @BeforeEach
    void setUp() {
        mapper = Mappers.getMapper(TransactionFideliteMapper.class);
        
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(1);
        RendezVous rendezVous = new RendezVous();
        rendezVous.setId(5);
        
        transaction = new TransactionFidelite();
        transaction.setId(100);
        transaction.setUtilisateur(utilisateur);
        transaction.setRendezVous(rendezVous);
        transaction.setPointsAttribues(15);
        
        dto = new TransactionFideliteDTO();
        dto.setId(100);
        dto.setClientId(1);
        dto.setRendezVousId(5);
        dto.setPointsAttribues(15);
    }
    
    @Test
    void versDTO_mappeCorrectement() {
        TransactionFideliteDTO result = mapper.versDTO(transaction);
        
        assertEquals(1, result.getClientId());
        assertEquals(5, result.getRendezVousId());
        assertEquals(15, result.getPointsAttribues());
    }
}
