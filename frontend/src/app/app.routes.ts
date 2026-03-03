import { Routes } from '@angular/router';
import { ListeClients } from './pages/clients/liste-clients/liste-clients';
import { FormulaireClient } from './pages/clients/formulaire-client/formulaire-client';
import { ListeRendezVous } from './pages/rendez-vous/liste-rendez-vous/liste-rendez-vous';
import { FormulaireRendezVous } from './pages/rendez-vous/formulaire-rendez-vous/formulaire-rendez-vous';
import { DetailFidelisation } from './pages/fidelisation/detail-fidelisation/detail-fidelisation';

export const routes: Routes = [
    { path: '', redirectTo: 'clients', pathMatch: 'full' },
    { path: 'clients', component: ListeClients },
    { path: 'clients/nouveau', component: FormulaireClient },
    { path: 'clients/:id/modifier', component: FormulaireClient },
    { path: 'rendez-vous', component: ListeRendezVous },
    { path: 'rendez-vous/nouveau', component: FormulaireRendezVous },
    { path: 'clients/:id/fidelisation', component: DetailFidelisation }
];
