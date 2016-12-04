import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PredictionsComponent } from './predictions/predictions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'predictions', component: PredictionsComponent },
  { path: 'about', component: AboutComponent}
];

export const routing = RouterModule.forRoot(routes);
