import { Route } from "@angular/router";
import { ByCapitalPageComponent } from "./pages/by-capital-page/by-capital-page.component";
import { CountryLayoutComponent } from "./layouts/country-layout/country-layout.component";

const countryRoutes: Route[] = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent,
      },
      {
        path: '**',
        redirectTo: 'by-capital',
      }
    ],
  }
];

export default countryRoutes;
