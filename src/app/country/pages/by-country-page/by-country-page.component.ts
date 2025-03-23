import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import type { Country } from '../../interfaces/country.interface';
import { of } from 'rxjs';
import type { CountryRequest } from '../../interfaces/country-request.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  imports: [
    SearchInputComponent,
    CountryListComponent
  ],
})
export default class ByCountryPageComponent {

  public countries = computed<Country[]>(() => this.countryResource.value() ?? []);

  public countryResource = rxResource<Country[], CountryRequest>({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      const query = request.query;
      if (!query) {
        return of([]);
      }

      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query,
        }
      })

      return this.countryService.searchByCountry(request.query);
    },
  });

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public queryParam: string = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  public query = linkedSignal<string>(() => this.queryParam);

  private countryService = inject(CountryService);

  // public countryResource = resource<Country[], CountryRequest>({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     if (!request.query) {
  //       return [];
  //     }
  //     return await firstValueFrom(this.countryService.searchByCountry(request.query));
  //   },
  // });


}
