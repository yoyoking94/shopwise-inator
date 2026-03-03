package com.shopwise.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UtilisateurCreationDTO {

    @NotBlank
    private String nom;

    @Email
    @NotBlank
    private String email;

    private String telephone;
}
