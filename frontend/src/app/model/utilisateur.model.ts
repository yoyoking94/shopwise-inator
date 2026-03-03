export interface Utilisateur {
    id?: number;
    nom: string;
    email: string;
    telephone?: string;
    role?: string;
    motDePasseTemporaire?: string;
}

export interface UtilisateurCreation {
    nom: string;
    email: string;
    telephone?: string;
}

export interface ConnexionDemande {
    email: string;
    motDePasse: string;
}

export interface ConnexionReponse {
    id: number;
    nom: string;
    email: string;
    role: string;
}
