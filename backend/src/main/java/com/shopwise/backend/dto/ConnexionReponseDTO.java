package com.shopwise.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ConnexionReponseDTO {
    private Integer id;
    private String nom;
    private String email;
    private String role;
}
