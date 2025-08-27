import { Routes } from '@angular/router';
import { WebinarDashboardComponent } from './features/webinar-dashboard/webinar-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: WebinarDashboardComponent,
    title: 'Webinar Platform - Home'
  },
  {
    path: 'webinars',
    component: WebinarDashboardComponent,
    title: 'Webinar Platform - Webinars'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
