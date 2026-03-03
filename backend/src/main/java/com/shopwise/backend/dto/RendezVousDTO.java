package com.shopwise.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class RendezVousDTO {
    private Integer id;

    @NotNull
    private Integer clientId;

    @NotNull
    private LocalDate dateRendezVous;

    @NotNull
    private LocalTime heureRendezVous;

    @NotBlank
    private String service;

    private String statut;
}
