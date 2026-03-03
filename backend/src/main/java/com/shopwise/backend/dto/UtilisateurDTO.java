package com.shopwise.backend.dto;

import lombok.Data;

@Data
public class UtilisateurDTO {
    private Integer id;
    private String nom;
    private String email;
    private String motDePasseTemporaire;
    private String telephone;
    private String role;
}
