export interface RendezVous {
    id?: number;
    clientId: number;
    dateRendezVous: string;
    heureRendezVous: string | null;
    service: string;
    statut?: string;
}
