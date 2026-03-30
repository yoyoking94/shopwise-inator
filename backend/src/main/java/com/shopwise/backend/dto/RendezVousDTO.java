package com.shopwise.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class RendezVousDTO {
    private Integer id;

    @NotNull(message = "Client obligatoire")
    private Integer clientId;

    @NotNull(message = "Date obligatoire")
    private LocalDate dateRendezVous;

    @NotNull(message = "Heure obligatoire")
    private LocalTime heureRendezVous;

    @NotBlank(message = "Service obligatoire")
    private String service;

    private String statut;
}
