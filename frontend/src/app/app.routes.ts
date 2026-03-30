import { Routes } from '@angular/router';
import { Connexion } from './pages/connexion/connexion';
import { EspaceClient } from './pages/espace-client/espace-client';
import { DetailFidelisation } from './pages/fidelisation/detail-fidelisation/detail-fidelisation';
import { FormulaireRendezVous } from './pages/rendez-vous/formulaire-rendez-vous/formulaire-rendez-vous';
import { ListeRendezVous } from './pages/rendez-vous/liste-rendez-vous/liste-rendez-vous';
import { FormulaireUtilisateur } from './pages/utilisateur/formulaire-utilisateur/formulaire-utilisateur';
import { ListeUtilisateur } from './pages/utilisateur/liste-utilisateur/liste-utilisateur';


export const routes: Routes = [
    { path: '', redirectTo: 'connexion', pathMatch: 'full' },
    { path: 'connexion', component: Connexion },
    { path: 'clients', component: ListeUtilisateur },
    { path: 'clients/nouveau', component: FormulaireUtilisateur },
    { path: 'clients/:id/modifier', component: FormulaireUtilisateur },
    { path: 'rendez-vous', component: ListeRendezVous },
    { path: 'rendez-vous/nouveau', component: FormulaireRendezVous },
    { path: 'mon-espace', component: EspaceClient },
    { path: 'clients/:id/fidelisation', component: DetailFidelisation }
];
