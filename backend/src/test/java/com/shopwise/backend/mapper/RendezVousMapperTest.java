package com.shopwise.backend.mapper;

import com.shopwise.backend.dto.RendezVousDTO;
import com.shopwise.backend.entities.RendezVous;
import com.shopwise.backend.entities.StatutRendezVous;
import com.shopwise.backend.entities.Utilisateur;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

class RendezVousMapperTest {

    private RendezVousMapper mapper;
    private RendezVous rendezVous;
    private RendezVousDTO rendezVousDTO;

    @BeforeEach
    void setUp() {
        mapper = Mappers.getMapper(RendezVousMapper.class);

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(1);

        rendezVous = new RendezVous();
        rendezVous.setId(10);
        rendezVous.setUtilisateur(utilisateur);
        rendezVous.setDateRendezVous(LocalDate.of(2026, 3, 5));
        rendezVous.setHeureRendezVous(LocalTime.of(10, 0));
        rendezVous.setService("Coupe");
        rendezVous.setStatut(StatutRendezVous.HONORE);

        rendezVousDTO = new RendezVousDTO();
        rendezVousDTO.setId(10);
        rendezVousDTO.setClientId(1);
        rendezVousDTO.setDateRendezVous(LocalDate.of(2026, 3, 5));
        rendezVousDTO.setHeureRendezVous(LocalTime.of(10, 0));
        rendezVousDTO.setService("Coupe");
        rendezVousDTO.setStatut("HONORE");
    }

    @Test
    void versDTO_mappeCorrectement() {
        RendezVousDTO dto = mapper.versDTO(rendezVous);

        assertEquals(1, dto.getClientId());
        assertEquals("HONORE", dto.getStatut());
        assertEquals("Coupe", dto.getService());
    }

    @Test
    void versEntite_mappeCorrectement() {
        RendezVous entity = mapper.versEntite(rendezVousDTO);

        assertEquals(1, entity.getUtilisateur().getId());
        assertEquals("Coupe", entity.getService());
    }
}
