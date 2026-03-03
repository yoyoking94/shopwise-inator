package com.shopwise.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ConnexionDTO {

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String motDePasse;
}
