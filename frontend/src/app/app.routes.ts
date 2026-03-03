import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'clients', pathMatch: 'full' },
    { path: 'clients', component: ListeClients },
    { path: 'clients/nouveau', component: FormulaireClient },
    { path: 'clients/:id/modifier', component: FormulaireClient },
];
