package com.shopwise.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TransactionFideliteDTO {
    private Integer id;
    private Integer clientId;
    private Integer rendezVousId;
    private Integer pointsAttribues;
    private LocalDateTime dateTransaction;
}
