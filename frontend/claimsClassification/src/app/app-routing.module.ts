import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimsTableComponent } from './components/claims-table/claims-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'claims-table', pathMatch: 'full' },
  { path: 'claims-table', component: ClaimsTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
