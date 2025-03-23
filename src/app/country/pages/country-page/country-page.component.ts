import { Component, computed, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CountryService } from '../../services/country.service';
import type { CountryRequest } from '../../interfaces/country-request.interface';
import type { Country } from '../../interfaces/country.interface';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "../../components/country-information/country-information.component";

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  imports: [
    NotFoundComponent,
    CountryInformationComponent,
  ],
})
export class CountryPageComponent {

  private activateRoute: Observable<Record<string, string>> = inject(ActivatedRoute).params;
  // public countryCode: string = inject(ActivatedRoute).snapshot.params['code'];
  public countryCode = toSignal<string | undefined>(this.activateRoute
    .pipe(
      map((params) => params["code"])
    ));
  public country = computed(() => this.countryResource.value());
  public countryResource = rxResource<Country | undefined, CountryRequest>({
    request: () => ({ query: this.countryCode() ?? '' }),
    loader: ({ request }) => {
      return this.countryService.searchCountryByAlphaCode(request.query);
    },
  });

  private countryService = inject(CountryService);


}
